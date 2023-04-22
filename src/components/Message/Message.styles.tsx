import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  width: 100%;
`;

export const Image = styled.Image`
  width: 240px;
  height: 200px;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.dark};
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.dark};
  margin-top: 14px;
`;
