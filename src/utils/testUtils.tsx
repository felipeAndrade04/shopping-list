import React from 'react';
import { authReducer } from '@app/store';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import * as theme from '@app/theme';
import { configureStore } from '@reduxjs/toolkit';
import { MockSafeAreaContext } from '../mocks';
import { NavigationContainer } from '@react-navigation/native';

let store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export const wrapper = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <NavigationContainer>
        <MockSafeAreaContext.SafeAreaProvider>{children}</MockSafeAreaContext.SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  </ThemeProvider>
);

export function resetStore() {
  store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });
}
