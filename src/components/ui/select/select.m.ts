export interface SelectTriggerProps {
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  icon?: string;
  onClick?: () => void;
  className?: string;
  containerClassName?: string;
}

// Option item component
export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectOptionItemProps {
  option: SelectOption;
  isSelected: boolean;
  onClick: (value: string) => void;
}

export interface CustomSelectProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string | React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent) => void;
  name?: string;
  disabled?: boolean;
  icon?: string;
  options?: Array<{ label: string; value: string }>;
  className?: string;
  containerClassName?: string;
  optionsClassName?: string;
}
