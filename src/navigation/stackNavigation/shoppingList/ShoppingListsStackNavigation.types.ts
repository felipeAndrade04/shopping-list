import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ShoppingListsStackParamList = {
  AddProduct: undefined;
  ShoppingList: { id: string };
  Home: undefined;
};

export type ShoppingListStackNavigationProps =
  NativeStackNavigationProp<ShoppingListsStackParamList>;
