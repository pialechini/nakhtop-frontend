import { createBrowserRouter, redirect } from 'react-router';
import { RootLayout } from '@/layout';
import AuthGuard from '@/components/auth-guard';
import NotFoundPage from '@/pages/not-found';
import authRoutes from '@/features/auth/routes';
import producerRoutes from '@/features/producer/routes';

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
