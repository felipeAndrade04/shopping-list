import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  disabled?: boolean;
  isFocused?: boolean;
}
