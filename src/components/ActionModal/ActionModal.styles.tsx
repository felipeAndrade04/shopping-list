import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  padding: 24px;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const Action = styled.View`
  flex: 1;
`;
