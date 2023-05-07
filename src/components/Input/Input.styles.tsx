import styled from 'styled-components/native';
import { InputProps } from './Input.types';

export const InputContainer = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput<InputProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  border: ${({ theme, isFocused, error }) => {
    if (error) return `2px solid ${theme.colors.red}`;

    return isFocused ? `2px solid ${theme.colors.main}` : `1px solid ${theme.colors.dark}`;
  }};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export const InputTextError = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  margin-top: 2px;
  margin-left: 4px;
`;
