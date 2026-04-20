import { redirect } from 'react-router';
import ProducerRegisterPage from '@/features/register/pages/producer-register';

export default {
  path: 'register',
  children: [
    {
      index: true,
      loader: () => redirect('/register/producer'),
    },
    {
      path: 'producer',
      element: <ProducerRegisterPage />,
    },
  ],
};
