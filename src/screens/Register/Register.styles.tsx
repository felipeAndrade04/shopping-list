import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 24px;
`;

export const Logo = styled.Image`
  margin-bottom: 24px;
`;

export const InputsContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-top: 48px;
`;

export const SimpleButton = styled(RectButton)`
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 24px;
`;

export const SimpleButtonBoldText = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SimpleButtonText = styled.Text`
  font-size: 14px;
`;
