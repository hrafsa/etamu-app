import React, {createContext, useContext, useState, useCallback, useEffect, useMemo, useRef} from 'react';
import api from '../api/client';
import {useAuth, ENDPOINTS} from '../auth/AuthContext';

// Pindahkan initialForm ke luar komponen agar stabil dan tidak jadi dependency useCallback
const INITIAL_FORM = {
  nama_instansi: '',
  atas_nama: '',
  jumlah_peserta: '',
  phone: '',
  email: '',
  kategori: null,
  kategori_name: '',
  sub_kategori: null,
  sub_kategori_name: '',
  tanggal_kunjungan: '',
  waktu_kunjungan: '',
  tujuan: '',
  dokumen: null, // { uri, name, type }
};

/* Data yang dibutuhkan backend pengajuan:
  nama_instansi, atas_nama, jumlah_peserta, phone, email,
  kategori (id kategori), sub_kategori (id sub kategori),
  tanggal_kunjungan (YYYY-MM-DD), waktu_kunjungan (HH:MM),
  tujuan (string), dokumen (file)
*/

const PengajuanContext = createContext(null);

export function PengajuanProvider({children}) {
  const {userToken} = useAuth();
  const [form, setForm] = useState(INITIAL_FORM);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [lastSubCategoryParent, setLastSubCategoryParent] = useState(null);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState({});
  const [submitMessage, setSubmitMessage] = useState('');

  // Refs untuk memegang snapshot terbaru agar dependency useCallback tetap minimal
  const categoriesRef = useRef(categories);
  const subCategoriesRef = useRef(subCategories);
  const lastParentRef = useRef(lastSubCategoryParent);
  useEffect(() => { categoriesRef.current = categories; }, [categories]);
  useEffect(() => { subCategoriesRef.current = subCategories; }, [subCategories]);
  useEffect(() => { lastParentRef.current = lastSubCategoryParent; }, [lastSubCategoryParent]);

  // Guards to avoid duplicate in-flight requests
  const fetchingCategoriesRef = useRef(false);
  const fetchingSubCategoriesRef = useRef(false);

  const resetForm = useCallback(() => {
    setForm(INITIAL_FORM);
    setSubmitErrors({});
    setSubmitMessage('');
  }, []);

  const setField = useCallback((key, value) => {
    setForm(prev => ({...prev, [key]: value}));
    setSubmitErrors(prev => (prev[key] ? {...prev, [key]: undefined} : prev));
  }, []);

  const fetchCategories = useCallback(async (opts = {}) => {
    const {force = false} = opts;
    if (!userToken) { return []; }
    if (fetchingCategoriesRef.current) { return categoriesRef.current; }
    // Jika tidak force dan sudah ada data, gunakan cache
    if (categoriesRef.current.length && !force) { return categoriesRef.current; }
    fetchingCategoriesRef.current = true;
    setLoadingCategories(true);
    try {
      const res = await api.get(ENDPOINTS.categories);
      const data = res.data?.data || [];
      setCategories(data);
      return data;
    } catch (e) {
      setCategories([]);
      return [];
    } finally {
      setLoadingCategories(false);
      fetchingCategoriesRef.current = false;
    }
  }, [userToken]);

  const fetchSubCategories = useCallback(async (categoryId, opts = {}) => {
    const {force = true} = opts;
    if (!userToken || !categoryId) { return []; }
    if (fetchingSubCategoriesRef.current) { return subCategoriesRef.current; }
    // Jika parent kategori berbeda, kosongkan daftar sebelum fetch agar tidak flicker data lama
    if (lastParentRef.current !== categoryId) {
      setSubCategories([]);
    }
    // Gunakan cache hanya jika force=false dan parent sama
    if (subCategoriesRef.current.length && !force && lastParentRef.current === categoryId) { return subCategoriesRef.current; }
    fetchingSubCategoriesRef.current = true;
    setLoadingSubCategories(true);
    try {
      const res = await api.get(ENDPOINTS.subCategories(categoryId));
      // Bentuk response backend:
      // { status, message, data: { category: {...}, data: [ {id, nama}, ... ] } }
      // Atau bisa saja { data: [ ... ] } atau { sub_categories: [ ... ] } atau array langsung.
      let raw = [];
      const root = res?.data;
      if (Array.isArray(root)) {
        raw = root;
      } else if (Array.isArray(root?.data)) {
        raw = root.data;
      } else if (Array.isArray(root?.sub_categories)) {
        raw = root.sub_categories;
      } else if (Array.isArray(root?.data?.data)) {
        raw = root.data.data;
      } else {
        raw = [];
      }
      // Normalisasi field nama -> name agar konsisten di UI
      const normalized = raw.map(item => ({
        ...item,
        name: item.name ?? item.nama ?? '',
      }));
      setSubCategories(normalized);
      setLastSubCategoryParent(categoryId);
      lastParentRef.current = categoryId;
      return normalized;
    } catch (e) {
      setSubCategories([]);
      setLastSubCategoryParent(categoryId);
      lastParentRef.current = categoryId;
      return [];
    } finally {
      setLoadingSubCategories(false);
      fetchingSubCategoriesRef.current = false;
    }
  }, [userToken]);

  // Bersihkan data saat logout
  useEffect(() => {
    if (!userToken) {
      setCategories([]);
      setSubCategories([]);
    }
  }, [userToken]);

  const submitPengajuan = useCallback(async () => {
    setSubmitLoading(true);
    setSubmitErrors({});
    setSubmitMessage('');
    try {
      const requiredKeys = ['nama_instansi','atas_nama','jumlah_peserta','phone','email','kategori','sub_kategori','tanggal_kunjungan','waktu_kunjungan','tujuan','dokumen'];
      const localErrors = {};
      requiredKeys.forEach(k => { if (!form[k]) { localErrors[k] = 'Wajib diisi'; } });
      if (Object.keys(localErrors).length) {
        setSubmitErrors(localErrors);
        setSubmitLoading(false);
        return {ok:false, local:true};
      }

      const fd = new FormData();
      fd.append('nama_instansi', form.nama_instansi);
      fd.append('atas_nama', form.atas_nama);
      fd.append('jumlah_peserta', String(form.jumlah_peserta));
      fd.append('phone', form.phone);
      fd.append('email', form.email);
      fd.append('kategori', String(form.kategori));
      fd.append('sub_kategori', String(form.sub_kategori));
      fd.append('tanggal_kunjungan', form.tanggal_kunjungan);
      fd.append('waktu_kunjungan', form.waktu_kunjungan);
      fd.append('tujuan', form.tujuan);
      if (form.dokumen) {
        fd.append('dokumen', {
          uri: form.dokumen.uri,
          name: form.dokumen.name || 'dokumen',
          type: form.dokumen.type || 'application/octet-stream',
        });
      }

      const res = await api.post(ENDPOINTS.pengajuan, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSubmitMessage(res.data?.message || 'Pengajuan berhasil dikirim');
      return {ok:true, data: res.data};
    } catch (e) {
      const apiErrors = e?.data?.errors;
      if (apiErrors && typeof apiErrors === 'object') {
        const parsed = {};
        Object.entries(apiErrors).forEach(([k,v]) => {
          if (Array.isArray(v)) { parsed[k] = v[0]; } else if (typeof v === 'string') { parsed[k] = v; }
        });
        setSubmitErrors(parsed);
        setSubmitMessage(e?.data?.message || 'Validasi gagal');
      } else {
        setSubmitMessage(e?.message || 'Gagal mengirim pengajuan');
      }
      return {ok:false, error:e};
    } finally {
      setSubmitLoading(false);
    }
  }, [form]);

  // Ganti nilai value context
  const value = useMemo(() => ({
    form,
    setField,
    resetForm,
    categories,
    loadingCategories,
    fetchCategories,
    subCategories,
    loadingSubCategories,
    fetchSubCategories,
    submitPengajuan,
    submitLoading,
    submitErrors,
    submitMessage,
    lastSubCategoryParent,
  }), [form, categories, loadingCategories, subCategories, loadingSubCategories, fetchCategories, fetchSubCategories, submitPengajuan, submitLoading, submitErrors, submitMessage, resetForm, setField, lastSubCategoryParent]);

  return <PengajuanContext.Provider value={value}>{children}</PengajuanContext.Provider>;
}

export function usePengajuan() {
  const ctx = useContext(PengajuanContext);
  if (!ctx) { throw new Error('usePengajuan must be used within PengajuanProvider'); }
  return ctx;
}
