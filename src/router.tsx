import { createBrowserRouter, redirect } from 'react-router';
import RootLayout from '@/layout/RootLayout.tsx';
import producerRoutes from '@/features/producer/routes.tsx';
import authRoutes from '@/features/auth/routes.tsx';

export default createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: () => redirect('producer'),
      },
      authRoutes,
      producerRoutes,
    ],
  },
]);
