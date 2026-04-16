import { createBrowserRouter, redirect } from 'react-router';
import RootLayout from '@/layout/RootLayout';
import AuthGuard from '@/components/AuthGuard';
import NotFoundPage from '@/pages/NotFoundPage';
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
