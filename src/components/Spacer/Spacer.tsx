import React from 'react';
import { SpacerProps } from './Spacer.types';
import * as S from './Spacer.styles';

export function Spacer({ dimesion = 8 }: SpacerProps) {
  return <S.Container dimesion={dimesion} />;
}
