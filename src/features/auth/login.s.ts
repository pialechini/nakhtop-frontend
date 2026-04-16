import axios from '@/lib/axios.ts';

type VerifyOtp = {
  phone: string;
  code: string;
};

type RequestOtp = {
  phone: string;
  captcha_key: string;
  captcha_answer: string;
};

type CaptchaResponse = {
  key: string;
  image_url: string;
};

type VerifyOtpResponse = {
  access: string;
  refresh: string;
  registration_status: string;
};

export const captcha = () => {
  return axios.get<CaptchaResponse>('captcha');
};

export const requestOtp = (data: RequestOtp) => {
  return axios.post('otp/request', data);
};

export const verifyOtp = (data: VerifyOtp) => {
  return axios.post<VerifyOtpResponse>('otp/verify', data);
};
