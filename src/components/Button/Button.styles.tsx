import { colors } from '@app/theme';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ButtonProps } from './Button.types';

export const Container = styled(RectButton)<ButtonProps>`
  background-color: ${(props) => (props.variant === 'outline' ? colors.white : props.color)};
  border: ${(props) => (props.variant === 'outline' ? `2px solid ${props.color}` : 'none')};
  width: 100%;
  height: 50px;
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

export const Text = styled.Text<Pick<ButtonProps, 'color' | 'variant'>>`
  font-size: 18px;
  font-weight: 700;
  color: ${(props) => (props.variant === 'outline' ? props.color : colors.white)};
`;
