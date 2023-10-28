import { Button } from '@app/components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px;
`;

export const ButtonAddProduct = styled(Button)`
  position: absolute;
  bottom: 20px;
  left: 24px;
`;
