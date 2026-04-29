import nakhtopLogo from '@/assets/header.png';
import Button from '@/components/ui/button';
import { InputGroup, TextInput } from '@/components/ui/text-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  loginSchema,
  type LoginFormValues,
  type LoginViewProps,
} from './login.m';

const container = {
  hidden: { opacity: 0, scale: 0.98 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function LoginView({
  submit,
  captcha,
  fetchCaptcha,
  serverError,
  defaultValues,
}: LoginViewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues,
  });

  const allErrors = Object.values(errors)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: any) => e?.message)
    .filter(Boolean);

  return (
    <div className="flex items-start justify-center min-h-screen">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="mt-6 bg-white rounded-2xl shadow-xl w-full max-w-105 p-8 text-center"
        dir="rtl"
      >
        {/* LOGO */}
        <motion.div
          variants={item}
          className="mx-auto mb-6 w-32 h-32 rounded-full bg-black flex items-center justify-center"
        >
          <img src={nakhtopLogo} alt="Nakhtop Logo" className="h-16 w-auto" />
        </motion.div>

        <motion.h1 variants={item} className="mt-8 text-4xl font-extrabold">
          ورود
        </motion.h1>

        <motion.p variants={item} className="text-sm text-gray-600 mt-4">
          لطفاً شماره تماس خود را وارد کنید
        </motion.p>

        {/* SERVER ERROR */}
        <AnimatePresence>
          {serverError && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 mt-4 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs text-center"
            >
              {serverError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* FORM */}
        <motion.form variants={item} onSubmit={handleSubmit(submit)}>
          {/* PHONE */}
          <InputGroup className="mt-8">
            <TextInput
              placeholder="موبایل"
              dir="ltr"
              maxLength={11}
              {...register('phone')}
            />
          </InputGroup>

          <AnimatePresence>
            {errors.phone && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-red-500 text-xs mt-2 text-right"
              >
                {errors.phone.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* CAPTCHA */}
          <motion.div variants={item} className="flex mt-4 gap-4 items-center">
            <motion.button
              type="button"
              onClick={fetchCaptcha}
              whileTap={{ rotate: 10, scale: 0.95 }}
              className="min-w-8 shrink-0"
            >
              {captcha.image ? (
                <motion.div
                  key={captcha.image}
                  initial={{ opacity: 0, rotate: -5 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-12 flex items-center"
                  dangerouslySetInnerHTML={{ __html: captcha.image }}
                />
              ) : (
                <div className="h-12 w-24 bg-gray-100 rounded animate-pulse" />
              )}
            </motion.button>

            <InputGroup className="flex-1">
              <TextInput
                dir="ltr"
                placeholder="کد را وارد کنید"
                {...register('captcha_answer')}
              />
            </InputGroup>
          </motion.div>

          <AnimatePresence>
            {errors.captcha_answer && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6 }}
                className="text-red-500 text-xs mt-2 text-right"
              >
                {errors.captcha_answer.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* GLOBAL ERRORS */}
          <AnimatePresence>
            {allErrors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-right"
              >
                <div className="text-xs font-medium text-red-700 mb-2">
                  لطفاً خطاهای زیر را اصلاح کنید
                </div>

                <ul className="space-y-1">
                  {allErrors.map((msg, idx) => (
                    <motion.li
                      key={idx}
                      className="flex items-center gap-2 text-xs text-red-600"
                    >
                      <span className="text-red-500">●</span>
                      {msg}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUBMIT */}
          <motion.div variants={item} className="mt-6">
            <motion.div whileTap={{ scale: 0.97 }}>
              <Button
                type="submit"
                className="flex-1 w-full"
                loading={isSubmitting}
              >
                ورود
              </Button>
            </motion.div>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
