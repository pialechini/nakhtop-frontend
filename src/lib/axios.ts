import _axios, { type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
import useAuthStore from '@/stores/auth.store';
import { PERSIAN_ERRORS } from '@/constants/errors'; // Import constants

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const axios = _axios.create({
  baseURL: '/api/v1/',
  timeout: 60000,
});

axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token: string) => void> = [];

axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (!_axios.isAxiosError(error)) return Promise.reject(error);

    const status = error.response?.status;

    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    // --- Authentication Refresh Logic ---
    if (status === 401 && originalRequest && !originalRequest._retry) {
      const refresh = useAuthStore.getState().refreshToken;
      if (!refresh) {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          pendingRequests.push((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await _axios.post('/api/token/refresh/', { refresh });
        useAuthStore.getState().setAccessToken(data.access);
        originalRequest.headers.Authorization = `Bearer ${data.access}`;
        pendingRequests.forEach((cb) => cb(data.access));
        pendingRequests = [];
        return axios(originalRequest);
      } catch {
        useAuthStore.getState().logout();
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // --- Global Api Error Toast Logic ---
    // Only show global toast for 5xx errors (Server Crashes)
    // 4xx errors are treated as "Client/Validation" errors and
    // are expected to be handled by the specific component/page.

    if (status && status >= 500) {
      toast.error(
        error.response?.data.error ||
          PERSIAN_ERRORS[status] ||
          PERSIAN_ERRORS.DEFAULT
      );
    }

    return Promise.reject(error);
  }
);

export default axios;
