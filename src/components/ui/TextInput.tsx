import { cn } from '@/utils';
import type { InputHTMLAttributes } from 'react';

function TextInput({
  className,
  ...otherProps
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className={cn(
        'w-full bg-gray-100 rounded-xl py-3 px-4 placeholder:text-sm',
        'placeholder:text-right text-left border border-gray-300 focus:outline-none',
        'focus:ring-2 focus:ring-black',
        className
      )}
      {...otherProps}
    />
  );
}

export default TextInput;
