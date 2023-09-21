import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShoppingListsStackParamList } from './ShoppingListsStackNavigation.types';
import { AddProduct, Home, ShoppingList } from '@app/screens';

const Stack = createNativeStackNavigator<ShoppingListsStackParamList>();

export function ShoppingListsStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ShoppingList" component={ShoppingList} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
    </Stack.Navigator>
  );
}
