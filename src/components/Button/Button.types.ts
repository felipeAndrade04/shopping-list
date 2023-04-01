import { ReactNode } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

export interface ButtonProps extends RectButtonProperties {
  children: ReactNode | string;
  variant?: 'solid' | 'outline';
  color?: string;
  margin?: string;
}