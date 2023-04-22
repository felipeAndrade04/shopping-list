import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from '../tabNavigation';
import { AuthStackNavigator } from './auth';
import { useAuth } from '@app/hooks';

const Stack = createNativeStackNavigator();

export function MainStackNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
      })}
      initialRouteName={'Auth'}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Private" component={TabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStackNavigator} />
      )}
    </Stack.Navigator>
  );
}
