import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator, AuthStackNavigator } from '@app/navigation';

const Stack = createNativeStackNavigator();

export function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName={'Auth'}
    >
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="Home" component={TabNavigator} />
    </Stack.Navigator>
  );
}
