export type RegistrationStatus = 'complete' | 'user_incomplete' | 'producer_incomplete';

export interface CaptchaResponse {
  key: string;
  image_url: string;
}

export interface OtpRequestPayload {
  phone: string;
  captcha_key: string;
  captcha_answer: string;
}

export interface OtpVerifyPayload {
  phone: string;
  code: string;
}

export interface VerifyOtpResponse {
  access: string;
  refresh: string;
  registration_status: RegistrationStatus;
}
