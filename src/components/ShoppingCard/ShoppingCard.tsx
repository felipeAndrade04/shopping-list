import React from 'react';
import * as S from './ShoppingCard.styles';
import { ShoppingCardProps } from './ShoppingCard.types';
import { Spacer } from '../Spacer';
import { formatDate } from '@app/utils';

export function ShoppingCard({ shopping }: ShoppingCardProps) {
  return (
    <S.Container>
      <S.Title>{shopping.name}</S.Title>

      <Spacer dimesion={8} />

      <S.Footer>
        <S.Counter>0/0</S.Counter>
        <S.Date>{formatDate(shopping.created_at)}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
