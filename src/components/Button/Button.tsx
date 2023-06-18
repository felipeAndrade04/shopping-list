import { colors } from '@app/theme';
import React from 'react';
import * as S from './Button.styles';
import { ButtonProps } from './Button.types';
import { ActivityIndicator } from 'react-native';

export function Button({
  children,
  variant = 'solid',
  color = colors.main,
  isLoading,
  enabled = true,
  onPress,
  ...rest
}: ButtonProps) {
  return (
    <S.Container
      color={color}
      variant={variant}
      isLoading={isLoading}
      enabled={enabled}
      onPress={onPress}
      {...rest}
    >
      <S.Text color={color} variant={variant}>
        {isLoading ? (
          <ActivityIndicator
            color={variant === 'outline' ? color : colors.white}
            testID="button-loading"
          />
        ) : (
          children
        )}
      </S.Text>
    </S.Container>
  );
}
