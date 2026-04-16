import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/button';
import TextInput from '@/components/ui/text-input';
import type { LoginViewProps } from './login.m';

export default function LoginView({
  formik,
  captchaImageUrl,
  onRefreshCaptcha,
}: LoginViewProps) {
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

        <form onSubmit={formik.handleSubmit}>
          <div className="mt-8">
            <TextInput
              placeholder="موبایل"
              dir="ltr"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              maxLength={11}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-xs mt-1 text-right">
                {formik.errors.phone}
              </p>
            )}
          </div>

          <div className="flex mt-4 gap-4">
            <button
              onClick={onRefreshCaptcha}
              className="min-w-[32px] shrink-0"
              type="button"
            >
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

            <div className="flex-1">
              <TextInput
                dir="ltr"
                placeholder="کد را وارد کنید"
                name="captcha_answer"
                value={formik.values.captcha_answer}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.captcha_answer && formik.errors.captcha_answer && (
                <p className="text-red-500 text-xs mt-1 text-right">
                  {formik.errors.captcha_answer}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-stretch mt-4 gap-2">
            <Button
              type="submit"
              className="flex-1"
              loading={formik.isSubmitting}
            >
              ورود
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
