import React from 'react';
import { useFonts } from 'expo-font';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as theme from './theme';
import { TabNavigator } from './navigation/tabNavigation';
import { StatusBar } from 'react-native';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle={'light-content'} />
          <TabNavigator />
        </ThemeProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
