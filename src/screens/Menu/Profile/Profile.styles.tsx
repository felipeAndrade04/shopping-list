import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const InputsContainer = styled.View``;

export const Title = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.dark};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
