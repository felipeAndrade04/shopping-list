import { colors } from '@app/theme';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ButtonProps } from './Button.types';

export const Container = styled(RectButton as any)<ButtonProps>`
  background-color: ${(props) => (props.variant === 'outline' ? colors.white : props.color)};
  border: ${(props) => (props.variant === 'outline' ? `2px solid ${props.color}` : 'none')};
  width: 100%;
  height: 56px;
  padding: 8px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  opacity: ${(props) => (props.isLoading || !props.enabled ? 0.6 : 1)};
  margin-top: ${(props) => props.marginTop || 0}px;
  margin-right: ${(props) => props.marginRight || 0}px;
  margin-bottom: ${(props) => props.marginBottom || 0}px;
  margin-left: ${(props) => props.marginLeft || 0}px;
`;

export const Text = styled.Text<Pick<ButtonProps, 'color' | 'variant'>>`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${(props) => (props.variant === 'outline' ? props.color : colors.white)};
`;
