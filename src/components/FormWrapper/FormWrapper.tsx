import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export function FormWrapper({ children }: { children: ReactNode }) {
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {children}
    </KeyboardAwareScrollView>
  );
}
