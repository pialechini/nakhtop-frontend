import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { getCaptcha, requestOtp } from '@/features/auth/api';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { z } from 'zod';

const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل الزامی است')
    .regex(/^0\d{10}$/, 'شماره موبایل باید ۱۱ رقم و با ۰ شروع شود'),
  captcha_answer: z.string().min(1, 'کد کپچا الزامی است'),
});

function LoginPage() {
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

  const formik = useFormik({
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

  return (
    <div className="flex items-center justify-center">
      <div
        className="mt-6 bg-white rounded-2xl shadow-lg w-full max-w-md py-8 px-16 text-center"
        dir="rtl"
      >
        <div className="mx-auto w-28 h-28 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-14 w-auto" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold">ورود</h1>

        <p className="text-sm text-gray-600 mt-4 font-medium">
          لطفاً شماره تماس خود را وارد کنید
        </p>

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8">
            <TextInput
              placeholder="موبایل"
              dir="ltr"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={11}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1 text-right">
                {formik.errors.phone}
              </p>
            )}
          </div>

          <div className="flex mt-4 gap-4">
            <button
              onClick={fetchCaptcha}
              className="min-w-[32px] shrink-0"
              type="button"
            >
              {captchaImageUrl ? (
                <img
                  src={captchaImageUrl}
                  alt="captcha"
                  className="h-12 object-contain rounded"
                />
              ) : (
                <div className="h-12 w-24 bg-gray-100 rounded animate-pulse" />
              )}
            </button>

            <div className="flex-1">
              <TextInput
                dir="ltr"
                placeholder="کد را وارد کنید"
                name="captcha_answer"
                value={formik.values.captcha_answer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.captcha_answer && formik.errors.captcha_answer && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {formik.errors.captcha_answer}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-stretch mt-4 gap-2">
            <Button
              type="submit"
              className="flex-1"
              loading={formik.isSubmitting}
            >
              ورود
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
