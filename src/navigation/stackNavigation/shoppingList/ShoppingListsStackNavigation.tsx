import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingListsStackParamList } from './ShoppingListsStackNavigation.types';
import { AddProduct, Home, ShoppingList } from '@app/screens';
import { loggedHeaderBuilder } from '@app/navigation/options';

const Stack = createNativeStackNavigator<ShoppingListsStackParamList>();

export function ShoppingListsStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={loggedHeaderBuilder({ title: 'Home' })} />
      <Stack.Screen
        name="ShoppingList"
        component={ShoppingList}
        options={loggedHeaderBuilder({})}
      />
      <Stack.Screen
        name="AddProduct"
        component={AddProduct}
        options={loggedHeaderBuilder({ title: 'Adicionar produtos' })}
      />
    </Stack.Navigator>
  );
}
