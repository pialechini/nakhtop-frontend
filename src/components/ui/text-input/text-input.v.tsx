import { cn } from '@/utils';
import type { InputGroupProps, TextInputProps } from './text-input.m';
import { Children, forwardRef } from 'react';

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, icon, containerClassName, ...props }, ref) => {
    return (
      <div className={cn('relative p-4', containerClassName)}>
        {icon && <img src={icon} className="absolute" />}

        <input
          ref={ref}
          type="text"
          className={cn(
            'w-full placeholder:text-md text-right',
            'placeholder:text-right focus:outline-none',
            icon && 'pr-8',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

export function InputGroup({ children, className, ...rest }: InputGroupProps) {
  return (
    <div
      className={cn(
        'bg-background border rounded-2xl border-border',
        className
      )}
      {...rest}
    >
      {Children.toArray(children).map((child, index) => (
        <div
          key={index}
          className={cn(index !== 0 && 'border-t border-border')}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

TextInput.displayName = 'TextInput';
