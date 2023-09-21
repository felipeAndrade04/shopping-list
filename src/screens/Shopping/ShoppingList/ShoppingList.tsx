import React from 'react';
import { Text } from 'react-native';
import { ShoppingListProps } from './ShoppingList.types';

export function ShoppingList({ route }: ShoppingListProps) {
  console.log(route.params.id);

  return <Text>ShoppingList</Text>;
}
