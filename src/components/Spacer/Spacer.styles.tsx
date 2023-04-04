import styled from 'styled-components/native';
import { SpacerProps } from './Spacer.types';

export const Container = styled.View<SpacerProps>`
  width: ${(props) => props.dimesion}px;
  height: ${(props) => props.dimesion}px;
`;
