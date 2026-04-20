import { createBrowserRouter, redirect } from 'react-router';
import { RootLayout } from '@/layout';
import AuthGuard from '@/components/auth-guard';
import NotFoundPage from '@/pages/not-found';
import authRoutes from '@/features/auth/routes';
import producerRoutes from '@/features/producer/routes';
import registerRoutes from '@/features/register/routes';

export default createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('/login'),
      },
      authRoutes,
      registerRoutes,
      {
        element: <AuthGuard />,
        children: [producerRoutes],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);
