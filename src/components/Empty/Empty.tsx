import React from 'react';
import * as S from './Empty.styles';
import emptyAsset from '../../assets/images/empty.png';
import { EmptyProps } from './';

export function Empty({ description, title }: EmptyProps) {
  return (
    <S.Container>
      <S.Image source={emptyAsset} />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}
