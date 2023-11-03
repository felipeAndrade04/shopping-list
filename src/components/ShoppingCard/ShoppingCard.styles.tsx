import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.5,
}))`
  padding: 12px;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 8px;
  box-shadow: 4px 4px 2px #0d0a0b40;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.dark};
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const FooterLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Counter = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.gray[300]};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const CounterTotal = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Date = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[300]};
  font-family: ${({ theme }) => theme.fonts.regular};
`;
