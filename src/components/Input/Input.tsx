import React, { useState } from 'react';
import * as S from './Input.styles';
import { InputProps } from './Input.types';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';

export function Input({ disabled, error, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  function onFocus() {
    setIsFocused(true);
  }

  function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (props.onBlur && e) {
      props.onBlur(e);
    }
    setIsFocused(false);
  }

  return (
    <S.InputContainer>
      <S.Input
        {...props}
        onFocus={onFocus}
        onBlur={onBlur}
        isFocused={isFocused}
        editable={!disabled}
        disabled={disabled}
        error={error}
      />

      {error && <S.InputTextError>{error}</S.InputTextError>}
    </S.InputContainer>
  );
}
