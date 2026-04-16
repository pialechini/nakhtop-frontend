import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles';
import { RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import router from './router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </StrictMode>,
);
