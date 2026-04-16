import axios from '@/lib/axios';

export interface CaptchaResponse {
  key: string;
  image_url: string;
}

export interface VerifyOtpResponse {
  access: string;
  refresh: string;
  registration_status: 'complete' | 'user_incomplete' | 'producer_incomplete';
}

export const getCaptcha = () => {
  return axios.get<CaptchaResponse>('captcha/');
};

export const requestOtp = (data: {
  phone: string;
  captcha_key: string;
  captcha_answer: string;
}) => {
  return axios.post<{ detail: string }>('otp/request/', data);
};

export const verifyOtp = (data: { phone: string; code: string }) => {
  return axios.post<VerifyOtpResponse>('otp/verify/', data);
};

export const logout = (refresh: string) => {
  return axios.post('logout/', { refresh });
};
