import styled from 'styled-components/native';
import { CheckboxProps } from './Checkbox.types';

export const CheckboxContainer = styled.TouchableOpacity<CheckboxProps>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.main};
  border-radius: 4px;
  background-color: ${({ value, theme }) => (value ? theme.colors.main : theme.colors.white)};
`;
