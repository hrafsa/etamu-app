import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, {setAuthToken} from '../api/client';

// Simple, adaptable endpoints. Adjust to your Laravel routes if different.
export const ENDPOINTS = {
  login: '/login',
  register: '/register',
  profile: '/profile',
  password: '/profile/password',
  logout: '/logout',
  // Catalog endpoints
  categories: '/categories',
  subCategories: (categoryId) => `/categories/${categoryId}/sub-categories`,
  // Pengajuan endpoints
  pengajuan: '/pengajuan', // GET (list) or POST (store)
  pengajuanShow: (nomor) => `/pengajuan/${nomor}`,
};

const STORAGE_KEYS = {
  token: '@auth/token',
  user: '@auth/user',
};

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [isBootstrapping, setIsBootstrapping] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  const clearSession = useCallback(async () => {
    setAuthToken(null);
    setUser(null);
    setUserToken(null);
    await AsyncStorage.multiRemove([STORAGE_KEYS.token, STORAGE_KEYS.user]);
  }, []);

  const bootstrap = useCallback(async () => {
    try {
      const [token, userStr] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.token),
        AsyncStorage.getItem(STORAGE_KEYS.user),
      ]);
      if (token) {
        setAuthToken(token);
        setUserToken(token);
      }
      if (userStr) {
        try { setUser(JSON.parse(userStr)); } catch (_) {}
      }
      // Refresh profile from server if token exists
      if (token) {
        try {
          const res = await api.get(ENDPOINTS.profile);
          const profile = res.data?.data || res.data?.user || res.data || null;
          if (profile) {
            setUser(profile);
            await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
          }
        } catch (e) {
          // Only force logout for 401/403
          if (e?.status === 401 || e?.status === 403) {
            await clearSession();
          }
        }
      }
    } finally {
      setIsBootstrapping(false);
    }
  }, [clearSession]);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  // Auto-logout on 401 from any request
  useEffect(() => {
    const id = api.interceptors.response.use(
      res => res,
      async err => {
        if (err?.status === 401) {
          await clearSession();
        }
        return Promise.reject(err);
      },
    );
    return () => api.interceptors.response.eject(id);
  }, [clearSession]);

  const login = useCallback(async ({email, password}) => {
    const res = await api.post(ENDPOINTS.login, {email, password});
    const token = res.data?.token || res.data?.access_token || res.data?.data?.token;
    const profile = res.data?.user || res.data?.data?.user || null;
    if (!token) {
      throw new Error('Token tidak ditemukan pada response API');
    }

    setAuthToken(token);
    setUserToken(token);
    setUser(profile);

    await AsyncStorage.multiSet([
      [STORAGE_KEYS.token, token],
      [STORAGE_KEYS.user, JSON.stringify(profile)],
    ]);
    return {token, user: profile};
  }, []);

  const register = useCallback(async (payload) => {
    const res = await api.post(ENDPOINTS.register, payload);
    const token = res.data?.token || res.data?.access_token || res.data?.data?.token;
    const profile = res.data?.user || res.data?.data?.user || null;
    if (token) {
      setAuthToken(token);
      setUserToken(token);
      setUser(profile);
      await AsyncStorage.multiSet([
        [STORAGE_KEYS.token, token],
        [STORAGE_KEYS.user, JSON.stringify(profile)],
      ]);
      return {token, user: profile};
    }
    return {token: null, user: null};
  }, []);

  const fetchProfile = useCallback(async () => {
    const res = await api.get(ENDPOINTS.profile);
    const profile = res.data?.data || res.data?.user || res.data || null;
    setUser(profile);
    await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
    return profile;
  }, []);

  const updateProfile = useCallback(async (payload) => {
    const res = await api.patch(ENDPOINTS.profile, payload);
    // Some backends return updated user; if not, re-fetch
    const profile = res.data?.data || res.data?.user || null;
    if (profile) {
      setUser(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
      return profile;
    }
    return fetchProfile();
  }, [fetchProfile]);

  // New: change password via PUT /profile/password
  const changePassword = useCallback(async ({current_password, password, password_confirmation}) => {
    const payload = { current_password, password, password_confirmation };
    // Some backends return user or message; we don't rely on it here
    const res = await api.put(ENDPOINTS.password, payload);
    // If backend returns updated user, persist it; otherwise skip
    const profile = res.data?.data || res.data?.user || null;
    if (profile) {
      setUser(profile);
      await AsyncStorage.setItem(STORAGE_KEYS.user, JSON.stringify(profile));
    }
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    try { await api.post(ENDPOINTS.logout); } catch (_) { /* ignore */ } finally { await clearSession(); }
  }, [clearSession]);

  const value = useMemo(() => ({
    isBootstrapping,
    userToken,
    user,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    changePassword,
  }), [isBootstrapping, userToken, user, login, register, logout, fetchProfile, updateProfile, changePassword]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
