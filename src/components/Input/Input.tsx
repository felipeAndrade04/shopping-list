import React from 'react';
import * as S from './Input.styles';
import { InputProps } from './Input.types';

export function Input({ disabled, ...props }: InputProps) {
  return <S.Input {...props} editable={!disabled} disabled={disabled} />;
}
