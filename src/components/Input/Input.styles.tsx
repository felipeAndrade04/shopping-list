import styled from 'styled-components/native';
import { InputProps } from './Input.types';

export const Input = styled.TextInput<InputProps>`
  width: 100%;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.dark};
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 6px;
  border: ${({ theme, isFocused }) =>
    isFocused ? `2px solid ${theme.colors.main}` : `1px solid ${theme.colors.dark}`};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;
