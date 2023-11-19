import 'react-native-gesture-handler';
import React from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import * as theme from '@app/theme';
import '@app/config/reactotron-config';
import { MainStackNavigator } from '@app/navigation';
import { Provider } from 'react-redux';
import { store } from './src/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastContainer } from '@app/components';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': require('./src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-Medium': require('./src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('./src/assets/fonts/Poppins-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <ToastContainer />
              <StatusBar barStyle={'light-content'} />
              <MainStackNavigator />
            </ThemeProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
