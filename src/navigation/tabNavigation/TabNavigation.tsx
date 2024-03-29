import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { colors, fonts } from '@app/theme';
import { FabTabNavigation } from '@app/components';
import { ShoppingListsStackNavigator } from '../stackNavigation/shoppingList';
import { MenuStackNavigator } from '../stackNavigation/menu';

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
          headerShown: false,
        };
      }}
      initialRouteName={'HomeTab'}
    >
      <Tab.Screen
        name="HomeTab"
        component={ShoppingListsStackNavigator}
        options={{
          tabBarLabel: 'Home',
          headerTitle: 'Listas de Compras',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStackNavigator}
        options={{
          tabBarButton: () => (
            <View style={{ marginTop: -16 }}>
              <FabTabNavigation />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MenuTab"
        component={MenuStackNavigator}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => <Feather name="menu" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}
