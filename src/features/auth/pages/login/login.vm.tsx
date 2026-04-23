import { useEffect, useMemo } from 'react';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router';

import { requestOtp } from '@/features/auth/auth.s';
import type { LoginFormValues } from './login.m';
import { useCaptcha } from '@/features/auth/hooks/use-captcha';

export function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();

  const resendPhone = useMemo(
    () => location.state?.resend ?? '',
    [location.state]
  );

  const { captcha, fetchCaptcha } = useCaptcha();

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await requestOtp({
        phone: values.phone,
        captcha_key: captcha.key,
        captcha_answer: values.captcha_answer,
      });

      toast.success('کد تایید با موفقیت ارسال شد.');

      navigate('/login/verify-phone', {
        state: { phone: values.phone },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        const detail = error.response?.data?.detail;

        toast.error(
          typeof detail === 'string'
            ? detail
            : 'ورود ناموفق بود. لطفا دوباره تلاش کنید.'
        );
      } else {
        toast.error('خطایی رخ داد. لطفا دوباره تلاش کنید.');
      }

      await fetchCaptcha();
    }
  };

  return {
    onSubmit,

    captchaImageUrl: captcha.imageUrl,
    captchaLoading: captcha.loading,

    onRefreshCaptcha: fetchCaptcha,

    defaultValues: {
      phone: resendPhone,
      captcha_answer: '',
    } satisfies LoginFormValues,
  };
}
