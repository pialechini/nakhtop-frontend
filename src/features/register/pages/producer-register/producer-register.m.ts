import { z } from 'zod';
import type { FormikProps } from 'formik';

export interface ProducerRegisterFormValues {
  first_name: string;
  last_name: string;
  national_code: string;
  birth_day: string;
  birth_month: string;
  birth_year: string;
  email: string;
  landline_phone: string;
  parcel_code: string;
}

export interface ProducerRegisterViewProps {
  formik: FormikProps<ProducerRegisterFormValues>;
}

export const producerRegisterSchema = z.object({
  first_name: z.string().min(1, 'نام الزامی است'),
  last_name: z.string().min(1, 'نام خانوادگی الزامی است'),
  national_code: z
    .string()
    .min(1, 'کد ملی الزامی است')
    .regex(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
  birth_day: z.string().min(1, 'روز تولد الزامی است'),
  birth_month: z.string().min(1, 'ماه تولد الزامی است'),
  birth_year: z.string().min(1, 'سال تولد الزامی است'),
  email: z.string().min(1, 'ایمیل الزامی است').email('فرمت ایمیل معتبر نیست'),
  landline_phone: z
    .string()
    .min(1, 'تلفن ثابت محل سکونت الزامی است')
    .regex(/^\d+$/, 'تلفن ثابت فقط باید عدد باشد'),
  parcel_code: z.string().min(1, 'بسته تولیدی الزامی است'),
});
