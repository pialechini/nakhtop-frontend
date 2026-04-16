import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { verifyOtp } from '@/features/auth/auth.s';
import useAuthStore from '@/stores/auth.store';
import { OTP_COOLDOWN } from './verify-phone.m';
import VerifyPhoneView from './verify-phone.v';

function useVerifyPhoneViewModel() {
  const navigate = useNavigate();
  const location = useLocation();
  const phone: string = location.state?.phone ?? '';
  const setTokens = useAuthStore((s) => s.setTokens);

  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(OTP_COOLDOWN);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleVerify = async () => {
    if (otpCode.length < 6) return;
    setLoading(true);
    try {
      const { data } = await verifyOtp({ phone, code: otpCode });
      setTokens(data.access, data.refresh, data.registration_status);

      switch (data.registration_status) {
        case 'user_incomplete':
          navigate('/register', { replace: true });
          break;
        case 'producer_incomplete':
          navigate('/register/producer', { replace: true });
          break;
        default:
          navigate('/producer', { replace: true });
      }
    } catch {
      setOtpCode('');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = useCallback(() => {
    navigate('/login', { replace: true, state: { resend: phone } });
  }, [navigate, phone]);

  const handleBack = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const maskedPhone = phone.slice(0, 4) + '***' + phone.slice(7);

  return {
    otpCode,
    onOtpChange: setOtpCode,
    maskedPhone,
    countdown,
    loading,
    onVerify: handleVerify,
    onResend: handleResend,
    onBack: handleBack,
    phone,
  };
}

export default function VerifyPhonePage() {
  const { phone, ...vm } = useVerifyPhoneViewModel();
  const navigate = useNavigate();

  if (!phone) {
    navigate('/login', { replace: true });
    return null;
  }

  return <VerifyPhoneView {...vm} />;
}
