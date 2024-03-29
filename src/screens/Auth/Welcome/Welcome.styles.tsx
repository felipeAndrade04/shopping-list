import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px;
`;

export const LogoContainer = styled.View`
  margin-bottom: 48px;
`;

export const Buttons = styled.View`
  width: 100%;
  margin-top: 48px;
`;
