import styled from 'styled-components/native';

export const Container = styled.View<{ height: number }>`
  height: ${({ height }) => height}px;
  padding-left: 16px;
  padding-bottom: 6px;
  justify-content: flex-end;
  background: ${({ theme }) => theme.colors.background};
`;
