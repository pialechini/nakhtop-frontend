import { z } from 'zod';

export interface LoginViewProps {
  submit: (data: LoginFormValues) => void | Promise<void>;

  captcha: {
    key: string;
    imageUrl: string;
    loading: boolean;
  };

  fetchCaptcha: () => void;

  defaultValues: LoginFormValues;

  serverError?: string; // 👈 ADD THIS
}

export const loginSchema = z.object({
  phone: z
    .string()
    .min(1, 'شماره موبایل الزامی است')
    .regex(/^0\d{10}$/, 'شماره موبایل باید ۱۱ رقم و با ۰ شروع شود'),

  captcha_answer: z.string().min(1, 'کد کپچا الزامی است'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
