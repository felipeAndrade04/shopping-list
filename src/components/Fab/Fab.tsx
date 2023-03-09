import React from 'react';
import { Feather } from '@expo/vector-icons';

import * as S from './Fab.styles';
import { colors } from '@app/theme';

export function Fab() {
  return (
    <S.Container activeOpacity={0.7}>
      <Feather name="plus" color={colors.white} size={32} />
    </S.Container>
  );
}
