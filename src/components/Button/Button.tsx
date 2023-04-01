import { colors } from '@app/theme';
import React from 'react';
import * as S from './Button.styles';
import { ButtonProps } from './Button.types';

export function Button({ children, variant = 'solid', color = colors.main, onPress }: ButtonProps) {
  return (
    <S.Container color={color} variant={variant} onPress={onPress}>
      <S.Text color={color} variant={variant}>
        {children}
      </S.Text>
    </S.Container>
  );
}
