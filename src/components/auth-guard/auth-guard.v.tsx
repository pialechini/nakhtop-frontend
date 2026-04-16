import useAuthStore from '@/stores/auth.store';
import { Navigate, Outlet } from 'react-router';

export default function AuthGuard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
