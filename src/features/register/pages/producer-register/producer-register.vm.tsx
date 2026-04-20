import { useFormik } from 'formik';
import { useNavigate } from 'react-router';
import {
  producerRegisterSchema,
  type ProducerRegisterFormValues,
} from './producer-register.m';
import ProducerRegisterView from './producer-register.v';

function useProducerRegisterViewModel() {
  const navigate = useNavigate();

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
    onSubmit: () => {
      navigate('/producer', { replace: true });
    },
  });

  return { formik };
}

export default function ProducerRegisterPage() {
  const vm = useProducerRegisterViewModel();
  return <ProducerRegisterView {...vm} />;
}
