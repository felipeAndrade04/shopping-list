import styled from 'styled-components/native';

export const Container = styled.View<{ width: number }>`
  position: absolute;
  bottom: 48px;
  z-index: 2;
  width: ${({ width }) => `${width}px`};
  left: 50%;
  transform: translateX(${({ width }) => `${width / -2}px`});
`;
