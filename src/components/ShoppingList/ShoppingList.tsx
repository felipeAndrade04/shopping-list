import React from 'react';
import * as S from './ShoppingList.styles';
import { ShoppingListProps } from './ShoppingList.types';
import { ShoppingCard } from '../ShoppingCard';
import { Shopping } from '@app/models';
import { FlatList } from 'react-native';
import { Spacer } from '../Spacer';

export function ShoppingList({ data }: ShoppingListProps) {
  function renderItem({ item }: { item: Shopping }) {
    return <ShoppingCard shopping={item} />;
  }

  return (
    <S.Container>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={() => <Spacer dimesion={16} />}
        showsVerticalScrollIndicator={false}
      />
    </S.Container>
  );
}
