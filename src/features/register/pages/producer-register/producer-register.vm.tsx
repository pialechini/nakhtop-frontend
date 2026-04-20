import { useFormik } from 'formik';
import { isAxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { completeProfile } from '@/features/auth/auth.s';
import {
  producerRegisterSchema,
  type ProducerRegisterFormValues,
} from './producer-register.m';
import ProducerRegisterView from './producer-register.v';

const fieldErrorMap: Record<string, keyof ProducerRegisterFormValues> = {
  national_id: 'national_code',
  emergency_phone: 'landline_phone',
};

function useProducerRegisterViewModel() {
  const navigate = useNavigate();

  const toBirthdate = (values: ProducerRegisterFormValues) => {
    const year = values.birth_year.trim();
    const month = values.birth_month.padStart(2, '0');
    const day = values.birth_day.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formik = useFormik<ProducerRegisterFormValues>({
    initialValues: {
      first_name: '',
      last_name: '',
      national_code: '',
      birth_day: '',
      birth_month: '',
      birth_year: '',
      email: '',
      landline_phone: '',
      parcel_code: '',
    },
    validate: (values) => {
      const result = producerRegisterSchema.safeParse(values);
      if (result.success) return {};

      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!errors[field]) errors[field] = issue.message;
      }
      return errors;
    },
    onSubmit: async (values, helpers) => {
      try {
        await completeProfile({
          first_name: values.first_name,
          last_name: values.last_name,
          national_id: values.national_code,
          birthdate: toBirthdate(values),
          email: values.email,
          emergency_phone: values.landline_phone,
          job_type: 'producer',
        });
        navigate('/producer', { replace: true });
      } catch (error) {
        if (isAxiosError(error) && error.response?.data) {
          const data = error.response.data as Record<string, string | string[]>;
          const nextErrors: Partial<
            Record<keyof ProducerRegisterFormValues, string>
          > = {};

          Object.entries(data).forEach(([key, value]) => {
            const message = Array.isArray(value) ? value[0] : value;
            if (typeof message !== 'string') return;
            const targetKey =
              fieldErrorMap[key] ?? (key as keyof ProducerRegisterFormValues);
            if (targetKey in values) nextErrors[targetKey] = message;
          });

          if (Object.keys(nextErrors).length > 0) {
            helpers.setErrors(nextErrors);
            return;
          }
        }

        toast.error('ثبت اطلاعات ناموفق بود. لطفا دوباره تلاش کنید.');
      }
    },
  });

  return { formik };
}

export default function ProducerRegisterPage() {
  const vm = useProducerRegisterViewModel();
  return <ProducerRegisterView {...vm} />;
}
