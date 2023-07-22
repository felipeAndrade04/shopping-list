import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

import { Home, Menu } from '@app/screens';
import { colors, fonts } from '@app/theme';
import { Fab } from '@app/components';

export function TabNavigator() {
  const insets = useSafeAreaInsets();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={() => {
        return {
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: colors.gray[300],
          tabBarLabelStyle: {
            fontFamily: fonts.medium,
            fontSize: 16,
          },
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            height: 55 + insets.bottom,
          },
          headerStyle: {
            backgroundColor: colors.main,
            height: 55 + insets.top,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontFamily: fonts.bold,
            fontSize: 18,
          },
          headerTitleAlign: 'left',
        };
      }}
      initialRouteName={'Home'}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Listas de Compras',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="CreatShoppingList"
        component={Menu}
        options={{
          tabBarButton: () => (
            <View style={{ marginTop: -16 }}>
              <Fab />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => <Feather name="menu" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
