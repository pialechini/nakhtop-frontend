import { cn } from '@/utils';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
  loading?: boolean;
};

function Button({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled,
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <button
      disabled={loading || disabled}
      className={cn(
        'py-3 rounded-full text-sm transition-opacity',
        variant === 'primary' ? 'bg-black text-white' : '',
        variant === 'secondary'
          ? 'bg-[#F4F4F4] text-black hover:bg-[#E9E9E9] border-gray-300'
          : '',
        (loading || disabled) && 'opacity-50 cursor-not-allowed',
        className,
      )}
      {...rest}
    >
      {loading ? '...' : children}
    </button>
  );
}

export default Button;
