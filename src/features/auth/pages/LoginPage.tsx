import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/Button.tsx';
import TextInput from '@/components/ui/TextInput.tsx';

function LoginPage() {
  return (
    <div className="flex items-center justify-center">
      <div
        className="mt-6 bg-white rounded-2xl shadow-lg w-full max-w-md py-8 px-16 text-center"
        dir="rtl"
      >
        {/* Logo */}
        <div className="mx-auto w-28 h-28 rounded-full bg-black flex items-center justify-center">
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-14 w-auto" />
        </div>

        {/* Title */}
        <h1 className="mt-8 text-4xl font-extrabold">ورود</h1>

        <p className="text-sm text-gray-600 mt-4 font-medium">
          لطفاً شماره تماس خود را وارد کنید
        </p>

        {/* Phone TextInput */}
        <div className="mt-8">
          <TextInput placeholder="موبایل" dir="ltr" />
        </div>

        {/* Code TextInput */}
        <div className="flex mt-4 gap-4">
          <div className="min-w-[32px]">
            <img
              src="http://localhost:8000/captcha/image/5de6edf244114c6d262547ca62552f742e4a24f5"
              alt="captcha"
              className="h-12 object-contain"
            />
          </div>

          <TextInput dir="ltr" placeholder="کد را وارد کنید" />
        </div>

        <div className="flex justify-stretch mt-4 gap-2">
          <Button className="flex-1">ورود</Button>

          <Button className="px-6" variant="secondary">
            ثبت نام
          </Button>
        </div>

        <div className="flex justify-between">
          {/* Bottom Link */}
          <a className="text-xs text-purple-700 mt-6 block">
            رمز خود را فراموش کرده ام
          </a>

          <a className="text-xs text-purple-700 mt-6 block">
            بازیابی حساب کاربری
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
