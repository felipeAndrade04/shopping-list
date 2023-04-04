import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 24px;
`;

export const InputsContainer = styled.View`
  width: 100%;
  flex-direction: column;
  margin-top: 48px;
`;
