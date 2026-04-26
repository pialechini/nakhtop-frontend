import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { requestOtp } from '@/features/auth/auth.s';
import { useCaptcha } from './use-captcha';
import type { LoginFormValues } from '../pages/login/login.m';
import type { AxiosError } from 'axios';

export function useLogin() {
  const navigate = useNavigate();
  const location = useLocation();

  const resendPhone = location.state?.resend ?? '';

  const { captcha, fetchCaptcha } = useCaptcha();

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const [serverError, setServerError] = useState<string>('');

  const submit = async (data: LoginFormValues) => {
    try {
      setServerError('');

      await requestOtp({
        phone: data.phone,
        captcha_key: captcha.key,
        captcha_answer: data.captcha_answer,
      });

      navigate('/login/verify-phone', {
        state: { phone: data.phone },
      });
    } catch (err) {
      const error = err as AxiosError;

      const message =
        error.response?.data?.captcha_answer ||
        'خطا در ارسال کد. دوباره تلاش کنید.';

      setServerError(message);

      await fetchCaptcha(); // refresh captcha on failure
    }
  };

  return {
    serverError,
    submit,
    captcha,
    fetchCaptcha,
    defaultValues: {
      phone: resendPhone,
      captcha_answer: '',
    },
  };
}
