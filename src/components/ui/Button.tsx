import { cn } from '@/utils';
import type { PropsWithChildren } from 'react';

type Props = {
  className?: string;
  variant?: 'primary' | 'secondary';
};

function Button({
  children,
  className,
  variant = 'primary',
}: PropsWithChildren<Props>) {
  return (
    <button
      className={cn(
        'py-3 rounded-full text-lg text-sm',
        variant === 'primary' ? 'bg-black text-white' : '',
        variant === 'secondary'
          ? 'bg-[#F4F4F4] text-black hover:bg-[#E9E9E9] border-gray-300'
          : '',
        className
      )}
    >
      {children}
    </button>
  );
}

export default Button;
