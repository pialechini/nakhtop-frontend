import _axios, { type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';
import useAuthStore from '@/stores/auth.store';

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

    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
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

    if (error.response) {
      const detail = error.response.data?.detail;
      if (detail && typeof detail === 'string') {
        toast.error(detail);
      }
    } else if (error.code) {
      toast.error('Network error. Please try again.');
    }

    return Promise.reject(error);
  }
);

export default axios;
