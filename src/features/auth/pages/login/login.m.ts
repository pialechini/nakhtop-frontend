import type { FormikProps } from 'formik';
import { z } from 'zod';

export interface LoginFormValues {
  phone: string;
  captcha_answer: string;
}

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل الزامی است')
    .regex(/^0\d{10}$/, 'شماره موبایل باید ۱۱ رقم و با ۰ شروع شود'),
  captcha_answer: z.string().min(1, 'کد کپچا الزامی است'),
});

export interface LoginViewProps {
  formik: FormikProps<LoginFormValues>;
  captchaImageUrl: string;
  onRefreshCaptcha: () => void;
}
