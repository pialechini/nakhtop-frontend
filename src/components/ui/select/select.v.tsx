import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { cn } from '@/utils';
import type {
  CustomSelectProps,
  SelectOptionItemProps,
  SelectTriggerProps,
} from './select.m';

export const SelectTrigger = forwardRef<HTMLDivElement, SelectTriggerProps>(
  (
    {
      className,
      icon,
      containerClassName,
      placeholder,
      value,
      disabled,
      onClick,
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          'relative p-4 cursor-pointer',
          containerClassName,
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        onClick={!disabled ? onClick : undefined}
        ref={ref}
      >
        {icon && (
          <img
            src={icon}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            alt="icon"
          />
        )}

        <div
          className={cn(
            'w-full text-right',
            !value && 'text-gray-400',
            icon && 'pr-8',
            className
          )}
        >
          {value || placeholder}
        </div>
      </div>
    );
  }
);

const SelectOptionItem: React.FC<SelectOptionItemProps> = ({
  option,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={cn(
        'p-4 cursor-pointer hover:bg-gray-50 transition-colors',
        isSelected && 'bg-primary/10 text-primary'
      )}
      onClick={() => onClick(option.value)}
    >
      {option.label}
    </div>
  );
};

export const CustomSelect = forwardRef<HTMLDivElement, CustomSelectProps>(
  (
    {
      className,
      icon,
      containerClassName,
      optionsClassName,
      placeholder = 'انتخاب کنید',
      value,
      onChange,
      onBlur,
      name,
      disabled,
      options = [],
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState<string>('');
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Find selected option label
      const selectedOption = options.find((opt) => opt.value === value);
      setSelectedLabel(selectedOption?.label || '');
    }, [value, options]);

    useEffect(() => {
      // Close dropdown when clicking outside
      const handleClickOutside = (event: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          if (onBlur) {
            const blurEvent = new FocusEvent('blur');
            onBlur(blurEvent as any);
          }
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [onBlur]);

    const handleSelect = (optionValue: string) => {
      if (onChange) {
        onChange(optionValue);
      }
      setIsOpen(false);
    };

    const selectedOption = options.find((opt) => opt.value === value);

    return (
      <div ref={wrapperRef} className={cn('relative', containerClassName)}>
        <SelectTrigger
          ref={ref}
          placeholder={placeholder}
          value={selectedLabel}
          disabled={disabled}
          icon={icon}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={className}
          containerClassName={containerClassName}
        />

        {isOpen && !disabled && (
          <div
            className={cn(
              'absolute top-full left-0 right-0 mt-1 z-50',
              'bg-white border rounded-2xl border-border shadow-lg',
              'max-h-60 overflow-y-auto',
              optionsClassName
            )}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                className={cn(index !== 0 && 'border-t border-border')}
              >
                <SelectOptionItem
                  option={option}
                  isSelected={selectedOption?.value === option.value}
                  onClick={handleSelect}
                />
              </div>
            ))}
          </div>
        )}

        {/* Hidden input for form submission */}
        {name && <input type="hidden" name={name} value={value || ''} />}
      </div>
    );
  }
);
