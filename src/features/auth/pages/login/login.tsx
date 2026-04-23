import { LoginView } from './login.v';
import { useLogin } from '@/features/auth/hooks/use-login';

export function LoginPage() {
  const vm = useLogin();
  return <LoginView {...vm} />;
}
