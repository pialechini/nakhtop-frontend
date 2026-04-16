import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/Button.tsx';
import { useState } from 'react';
import OTPInput from 'react-otp-input';

function VerifyPhonePage() {
  const [otpCode, setOtpCode] = useState('');

  return (
    <div className="flex items-center justify-center">
      <div
        className="mt-6 bg-white rounded-2xl shadow-lg w-full max-w-md py-8 px-12 text-center"
        dir="rtl"
      >
        {/* Logo */}
        <div className="mx-auto w-28 h-28 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-14 w-auto" />
        </div>

        {/* Title */}
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
            numInputs={5}
            placeholder="_"
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} />}
            inputStyle="w-12! h-16 bg-[#F4F4F4] rounded-md text-lg"
            containerStyle="flex justify-center gap-x-1"
            shouldAutoFocus
          />

          <div className="flex justify-between mx-11" dir="rtl">
            <a className="text-xs text-gray-400 mt-6 block">ارسال مجدد</a>

            <a className="text-xs text-gray-400 mt-6 block">0937-2044837 </a>
          </div>

          <div className="flex justify-stretch mt-12 gap-2 mx-10" dir="rtl">
            <Button className="flex-1">تایید و ادامه</Button>
            <Button className="px-6" variant="secondary">
              بازگشت
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyPhonePage;
