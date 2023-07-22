import { Modal } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(Modal)``;

export const Overlay = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => `${theme.colors.overlay}aa`};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;

export const Content = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 1,
}))`
  width: 100%;
  padding: 12px;
  background: ${({ theme }) => theme.colors.gray[100]};
  border-radius: 16px;
`;
