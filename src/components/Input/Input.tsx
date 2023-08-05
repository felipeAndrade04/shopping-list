import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as S from './Input.styles';
import { InputProps } from './Input.types';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import { colors } from '@app/theme';

export function Input({
  disabled,
  error,
  inputPassword,
  testID,
  borderColor,
  borderWidth,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const iconName = showPassword ? 'eye-off' : 'eye';

  function onFocus() {
    setIsFocused(true);
  }

  function toggleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  function onBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    if (props.onBlur && e) {
      props.onBlur(e);
    }
    setIsFocused(false);
  }

  return (
    <S.InputContainer>
      <S.InputContent
        error={error}
        isFocused={isFocused}
        disabled={disabled}
        borderColor={borderColor}
        borderWidth={borderWidth}
      >
        <S.Input
          {...props}
          secureTextEntry={inputPassword && !showPassword}
          onFocus={onFocus}
          onBlur={onBlur}
          editable={!disabled}
          testID={testID ?? 'input'}
        />

        {inputPassword && (
          <Ionicons
            style={{ marginRight: 12 }}
            onPress={toggleShowPassword}
            name={iconName}
            color={colors.dark}
            size={24}
          />
        )}
      </S.InputContent>

      {error && <S.InputTextError>{error}</S.InputTextError>}
    </S.InputContainer>
  );
}
