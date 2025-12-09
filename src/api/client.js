// Centralized axios client with optional auth header
import axios from 'axios';

// TODO: set your Laravel API base URL here
const API_BASE_URL = 'http://10.0.2.2:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

// Keep token in module memory to avoid reading storage on every request
let authToken = null;

export function setAuthToken(token) {
  authToken = token;
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// Optional: response error normalization
api.interceptors.response.use(
  res => res,
  err => {
    // Normalize network or server errors
    if (err.response) {
      // Server responded with a status outside 2xx
      const {status, data} = err.response;
      const message = (data && (data.message || data.error)) || 'Request failed';
      return Promise.reject({status, message, data});
    }
    if (err.request) {
      return Promise.reject({status: 0, message: 'Network error or no response'});
    }
    return Promise.reject({status: 0, message: err.message || 'Unknown error'});
  },
);

export default api;

