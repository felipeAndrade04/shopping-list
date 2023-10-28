import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ShoppingListsStackParamList = {
  AddProduct: { id: string };
  ShoppingList: { id: string };
  Home: undefined;
};

export type ShoppingListStackNavigationProps =
  NativeStackNavigationProp<ShoppingListsStackParamList>;
