import React from 'react';
import * as S from './Menu.styles';
import { Button } from '@app/components';
import { colors } from '@app/theme';
import { useAuth } from '@app/hooks';

export function Menu() {
  const { logout } = useAuth();

  return (
    <S.Container>
      <Button onPress={logout} variant="outline" color={colors.red}>
        Sair
      </Button>
    </S.Container>
  );
}
