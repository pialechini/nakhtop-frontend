import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/Button';
import { verifyOtp } from '@/features/auth/api';
import useAuthStore from '@/stores/authStore';
import { useCallback, useEffect, useState } from 'react';
import OTPInput from 'react-otp-input';
import { useLocation, useNavigate } from 'react-router';

const OTP_COOLDOWN = 120;

function VerifyPhonePage() {
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

  if (!phone) {
    navigate('/login', { replace: true });
    return null;
  }

  const maskedPhone = phone.slice(0, 4) + '***' + phone.slice(7);

  const formatTime = (s: number) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="mt-6 bg-white rounded-2xl shadow-lg w-full max-w-md py-8 px-12 text-center"
        dir="rtl"
      >
        <div className="mx-auto w-28 h-28 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-14 w-auto" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold">تایید شماره</h1>

        <p className="text-sm text-gray-600 mt-6 font-medium">
          کدتایید برای شما ارسال شد
        </p>
        <p className="text-sm text-gray-600 mt-1 font-medium">
          لطفا آن را در بخش پایین وارد کنید
        </p>

        <div className="mt-8" dir="ltr">
          <OTPInput
            value={otpCode}
            onChange={setOtpCode}
            numInputs={6}
            placeholder="_"
            renderSeparator={<span />}
            renderInput={(props) => <input {...props} />}
            inputStyle="w-12! h-16 bg-[#F4F4F4] rounded-md text-lg"
            containerStyle="flex justify-center gap-x-1"
            shouldAutoFocus
          />

          <div className="flex justify-between mx-11" dir="rtl">
            {countdown > 0 ? (
              <span className="text-xs text-gray-400 mt-6 block">
                ارسال مجدد ({formatTime(countdown)})
              </span>
            ) : (
              <button
                onClick={handleResend}
                className="text-xs text-purple-700 mt-6 block font-medium"
                type="button"
              >
                ارسال مجدد
              </button>
            )}
            <span className="text-xs text-gray-400 mt-6 block" dir="ltr">
              {maskedPhone}
            </span>
          </div>

          <div className="flex justify-stretch mt-12 gap-2 mx-10" dir="rtl">
            <Button className="flex-1" onClick={handleVerify} loading={loading}>
              تایید و ادامه
            </Button>
            <Button
              className="px-6"
              variant="secondary"
              onClick={() => navigate('/login')}
            >
              بازگشت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPhonePage;
