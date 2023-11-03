import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuStackParamList } from './MenuStackNavigation.types';
import { Menu, Profile } from '@app/screens';
import { loggedHeaderBuilder } from '@app/navigation/options';

const Stack = createNativeStackNavigator<MenuStackParamList>();

export function MenuStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Menu">
      <Stack.Screen name="Menu" component={Menu} options={loggedHeaderBuilder({ title: 'Menu' })} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={loggedHeaderBuilder({ title: 'Perfil' })}
      />
    </Stack.Navigator>
  );
}
