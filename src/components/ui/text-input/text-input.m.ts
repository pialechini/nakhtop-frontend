import type {
  HTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
} from 'react';

export type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  animatePlaceholder?: boolean;
  icon?: string;
  containerClassName?: string;
};

export type InputGroupProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;
