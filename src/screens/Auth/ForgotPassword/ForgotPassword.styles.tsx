import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 24px;
`;

export const LogoContainer = styled.View`
  margin-bottom: 24px;
`;
