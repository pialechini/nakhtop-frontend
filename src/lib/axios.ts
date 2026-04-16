import _axios, { type AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

const ErrorTypes = {
  ERR_NETWORK: 'ERR_NETWORK',
  ERR_CANCELED: 'ERR_CANCELED',
  ERR_TIMEOUT: 'ECONNABORTED',
  ERR_BAD_REQUEST: 'ERR_BAD_REQUEST',
  ERR_FAILED: 'ERR_FAILED',
} as const;

const axios = _axios.create({
  baseURL: 'http://localhost:8000/api/',
  timeout: 60000,
});

const ResponseErrorHandler = (error: AxiosResponse) => {
  if (error === null) return 'Unknown Error';
  if (_axios.isAxiosError(error)) {
    const { response, code } = error;
    // if request had response handle error with http code else with error code
    if (response) {
      switch (response.status) {
        case 400:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 401:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 402:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 403:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 404:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 405:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 422:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 429:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
        case 500:
          toastError(response.data.message);
          return Promise.reject(error.response?.data.message);
      }
    } else {
      switch (code) {
        case ErrorTypes.ERR_NETWORK:
          toastNetworkErrors('خطا در ارتباط');
          break;
        case ErrorTypes.ERR_CANCELED:
          toastNetworkErrors('خطا در ارتباط');
          break;
        case ErrorTypes.ERR_TIMEOUT:
          toastNetworkErrors('خطا در ارتباط');
          break;
        case ErrorTypes.ERR_FAILED:
          toastNetworkErrors('خطا در ارتباط');
          break;
        default:
          toastNetworkErrors('خطا در ارتباط');
          break;
      }
    }
  }
};
axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  ResponseErrorHandler
);
const toastNetworkErrors = (message: string) => {
  toast(message, {
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
    position: 'top-center',
  });
};

const toastError = (errors: string) => {
  const splitedErrors = errors.split('\n');
  splitedErrors.map((error) => {
    toast.error(error);
  });
};

const token = localStorage.get('token');

if (token) {
  axios.defaults.headers['Authorization'] = 'Bearer ' + token;
}

export default axios;
