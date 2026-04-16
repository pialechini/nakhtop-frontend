import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getCaptcha, requestOtp } from '@/features/auth/auth.s';
import { loginSchema, type LoginFormValues } from './login.m';
import LoginView from './login.v';

function useLoginViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const resendPhone: string = location.state?.resend ?? '';

  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaImageUrl, setCaptchaImageUrl] = useState('');

  const fetchCaptcha = async () => {
    const { data } = await getCaptcha();
    setCaptchaKey(data.key);
    setCaptchaImageUrl(data.image_url);
    formik.setFieldValue('captcha_answer', '');
  };

  useEffect(() => {
    fetchCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik<LoginFormValues>({
    initialValues: { phone: resendPhone, captcha_answer: '' },
    validate: (values) => {
      const result = loginSchema.safeParse(values);
      if (result.success) return {};
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await requestOtp({
          phone: values.phone,
          captcha_key: captchaKey,
          captcha_answer: values.captcha_answer,
        });
        navigate('/login/verify-phone', { state: { phone: values.phone } });
      } catch {
        await fetchCaptcha();
      }
    },
  });

  return { formik, captchaImageUrl, onRefreshCaptcha: fetchCaptcha };
}

export default function LoginPage() {
  const vm = useLoginViewModel();
  return <LoginView {...vm} />;
}
