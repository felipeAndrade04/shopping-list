import React from 'react';
import * as S from './ShoppingCard.styles';
import { ShoppingCardProps } from './ShoppingCard.types';
import { Spacer } from '../Spacer';
import { formatDate } from '@app/utils';
import { ProgressCircle } from '../ProgressCircle';

export function ShoppingCard({ shopping }: ShoppingCardProps) {
  function calcProgress(products: []) {
    if (products.length === 0) {
      return 0;
    }

    return 100;
  }

  return (
    <S.Container>
      <S.Title>{shopping.name}</S.Title>

      <Spacer dimesion={8} />

      <S.Footer>
        <S.FooterLeft>
          <ProgressCircle progress={calcProgress(shopping.products)} size={25} />
          <Spacer dimesion={8} />
          <S.Counter>
            <S.CounterTotal>{shopping.products.length}</S.CounterTotal>/{shopping.products.length}
          </S.Counter>
        </S.FooterLeft>
        <S.Date>{formatDate(shopping.created_at)}</S.Date>
      </S.Footer>
    </S.Container>
  );
}
