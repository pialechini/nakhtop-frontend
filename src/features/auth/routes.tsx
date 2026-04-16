import LoginPage from '@/features/auth/pages/login';
import VerifyPhonePage from '@/features/auth/pages/verify-phone';

export default {
  path: 'login',
  children: [
    {
      index: true,
      element: <LoginPage />,
    },
    {
      path: 'verify-phone',
      element: <VerifyPhonePage />,
    },
  ],
};
