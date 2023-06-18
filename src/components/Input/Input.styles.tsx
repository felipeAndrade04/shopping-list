import styled from 'styled-components/native';
import { InputProps } from './Input.types';
import { css } from 'styled-components';

export const InputContainer = styled.View`
  width: 100%;
`;

export const InputContent = styled.View<InputProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 6px;
  border: ${({ theme }) => `1px solid ${theme.colors.dark}`};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  transition: border-color 0.3s ease-in;

  ${({ theme, isFocused }) =>
    isFocused &&
    css`
      color: ${theme.colors.dark};
      border-color: ${theme.colors.main};
    `}

  ${({ theme, error }) =>
    error &&
    css`
      color: ${theme.colors.red};
      border-color: ${theme.colors.red};
    `}
`;

export const Input = styled.TextInput`
  height: 50px;
  flex: 1;
  color: ${({ theme }) => theme.colors.dark};
  font-size: 16px;
  padding: 8px 16px;
`;

export const InputTextError = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-size: 12px;
  margin-top: 2px;
  margin-left: 4px;
`;
