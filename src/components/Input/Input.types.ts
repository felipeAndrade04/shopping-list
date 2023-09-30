import { ReactNode } from 'react';
import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  disabled?: boolean;
  isFocused?: boolean;
  inputPassword?: boolean;
  error?: string;
  borderColor?: string;
  borderWidth?: number;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
