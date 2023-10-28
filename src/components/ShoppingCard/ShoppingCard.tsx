import React from 'react';
import * as S from './ShoppingCard.styles';
import { ShoppingCardProps } from './ShoppingCard.types';
import { Spacer } from '../Spacer';
import { formatDate } from '@app/utils';
import { ProgressCircle } from '../ProgressCircle';
import { useNavigation } from '@react-navigation/native';
import { ShoppingListStackNavigationProps } from '@app/navigation/stackNavigation/shoppingList';
import { Product } from '@app/models';

export function ShoppingCard({ shopping }: ShoppingCardProps) {
  const navigation = useNavigation<ShoppingListStackNavigationProps>();

  function calcProgress(products: Product[]) {
    if (products.length === 0) {
      return 0;
    }

    return 100;
  }

  function navigateToShopping() {
    navigation.navigate('ShoppingList', { id: shopping.id });
  }

  return (
    <S.Container onPress={navigateToShopping}>
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
