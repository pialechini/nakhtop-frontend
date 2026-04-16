import VerifyPhonePage from '@/features/auth/pages/VerifyPhonePage.tsx';
import LoginPage from '@/features/auth/pages/LoginPage.tsx';

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
