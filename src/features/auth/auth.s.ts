import axios from '@/lib/axios';
import type {
  CaptchaResponse,
  CompleteProfilePayload,
  OtpRequestPayload,
  OtpVerifyPayload,
  VerifyOtpResponse,
} from './auth.m';

export const getCaptcha = () => {
  return axios.get<CaptchaResponse>('captcha/');
};

export const requestOtp = (data: OtpRequestPayload) => {
  return axios.post<{ detail: string }>('otp/request/', data);
};

export const verifyOtp = (data: OtpVerifyPayload) => {
  return axios.post<VerifyOtpResponse>('otp/verify/', data);
};

export const logout = (refresh: string) => {
  return axios.post('logout/', { refresh });
};

export const completeProfile = (data: CompleteProfilePayload) => {
  return axios.put('complete-profile/', data);
};
