export const OTP_COOLDOWN = 120;

export interface VerifyPhoneViewProps {
  otpCode: string;
  onOtpChange: (value: string) => void;
  maskedPhone: string;
  countdown: number;
  loading: boolean;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}
