import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/Button';
import TextInput from '@/components/ui/TextInput';
import { getCaptcha, requestOtp } from '@/features/auth/api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function LoginPage() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaImageUrl, setCaptchaImageUrl] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCaptcha = async () => {
    const { data } = await getCaptcha();
    setCaptchaKey(data.key);
    setCaptchaImageUrl(data.image_url);
    setCaptchaAnswer('');
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const handleSubmit = async () => {
    if (!phone || !captchaAnswer) return;
    setLoading(true);
    try {
      await requestOtp({
        phone,
        captcha_key: captchaKey,
        captcha_answer: captchaAnswer,
      });
      navigate('/login/verify-phone', { state: { phone } });
    } catch {
      await fetchCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="mt-6 bg-white rounded-2xl shadow-lg w-full max-w-md py-8 px-16 text-center"
        dir="rtl"
      >
        <div className="mx-auto w-28 h-28 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-14 w-auto" />
        </div>

        <h1 className="mt-8 text-4xl font-extrabold">ورود</h1>

        <p className="text-sm text-gray-600 mt-4 font-medium">
          لطفاً شماره تماس خود را وارد کنید
        </p>

        <div className="mt-8">
          <TextInput
            placeholder="موبایل"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={11}
          />
        </div>

        <div className="flex mt-4 gap-4">
          <button onClick={fetchCaptcha} className="min-w-[32px] shrink-0" type="button">
            {captchaImageUrl ? (
              <img
                src={captchaImageUrl}
                alt="captcha"
                className="h-12 object-contain rounded"
              />
            ) : (
              <div className="h-12 w-24 bg-gray-100 rounded animate-pulse" />
            )}
          </button>

          <TextInput
            dir="ltr"
            placeholder="کد را وارد کنید"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
          />
        </div>

        <div className="flex justify-stretch mt-4 gap-2">
          <Button className="flex-1" onClick={handleSubmit} loading={loading}>
            ورود
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
