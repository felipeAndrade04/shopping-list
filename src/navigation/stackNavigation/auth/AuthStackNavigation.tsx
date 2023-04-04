import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Welcome } from '@app/screens/Welcome';
import { Login } from '@app/screens/Login';

const Stack = createNativeStackNavigator();

export function AuthStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}
