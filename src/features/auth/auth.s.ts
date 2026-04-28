import axios from '@/lib/axios';
import type {
  CaptchaResponse,
  CompleteProfilePayload,
  OtpRequestPayload,
  OtpVerifyPayload,
  VerifyOtpResponse,
} from './auth.m';
import type { ApiSuccessResponse } from '@/types/api.types';

export const getCaptcha = () => {
  return axios.get<CaptchaResponse>('captcha/');
};

export const requestOtp = (data: OtpRequestPayload) => {
  return axios.post<{ detail: string }>('otp/request/', data);
};

export const verifyOtp = (data: OtpVerifyPayload) => {
  return axios.post<ApiSuccessResponse<VerifyOtpResponse>>('otp/verify/', data);
};

export const logout = (refresh: string) => {
  return axios.post('logout/', { refresh });
};

export const completeProfile = (data: CompleteProfilePayload) => {
  return axios.put('users/complete-profile/', data);
};
