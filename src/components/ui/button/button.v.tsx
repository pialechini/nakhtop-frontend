import { cn } from '@/utils';
import Spinner from '@/components/ui/spinner';
import type { PropsWithChildren } from 'react';
import type { ButtonProps } from './button.m';

export default function Button({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      disabled={loading || disabled}
      className={cn(
        'py-3 rounded-full text-sm transition-opacity flex items-center justify-center',
        variant === 'primary' ? 'bg-black text-white' : '',
        variant === 'secondary'
          ? 'bg-[#F4F4F4] text-black hover:bg-[#E9E9E9] border-gray-300'
          : '',
        (loading || disabled) && 'opacity-70 cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
}
