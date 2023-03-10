import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 24px;
  flex: 1;
  justify-content: center;
`;

export const Image = styled.Image`
  width: 240px;
  height: 200px;
  margin: 0 auto;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.dark};
  margin-top: 50px;
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.dark};
  margin-top: 14px;
`;
