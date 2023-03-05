import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { Home } from './screens/Home';

import * as theme from './theme';

export default function App() {
  console.log(theme);
  return (
    <ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>
  );
}
