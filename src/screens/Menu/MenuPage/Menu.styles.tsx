import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderContainer = styled.TouchableOpacity`
  width: 100%;
  padding: 24px;
`;

export const Header = styled.View`
  padding: 16px;
  border-radius: 8px;
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingsText = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.gray[300]};
`;

export const UserNameText = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.main};
`;

export const Footer = styled.View`
  padding: 24px;
  width: 100%;
`;
