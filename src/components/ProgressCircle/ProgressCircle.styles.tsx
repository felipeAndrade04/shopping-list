import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { ProgressCircleProps } from './ProgressCircle.types';

export const CircleBase = styled(Animated.View)<Partial<ProgressCircleProps>>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size / 2}px;
  border-width: ${(props) => props.size / 6}px;
`;

export const EmptyCircle = styled(CircleBase)`
  border-color: ${({ theme }) => theme.colors.gray[300]};
  justify-content: center;
  align-items: center;
  transform: rotate(-45deg);
`;

export const Indicator = styled(CircleBase)`
  position: absolute;
  border-left-color: ${({ theme }) => theme.colors.dark};
  border-top-color: ${({ theme }) => theme.colors.dark};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;

export const CoverIndicator = styled(CircleBase)`
  position: absolute;
  border-left-color: ${({ theme }) => theme.colors.gray[300]};
  border-top-color: ${({ theme }) => theme.colors.gray[300]};
  border-right-color: transparent;
  border-bottom-color: transparent;
`;
