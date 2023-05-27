import React from 'react';
import { Feather } from '@expo/vector-icons';
import { colors } from '@app/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as S from './Header.styles';

interface Props {
  onPress: () => void;
}

export function Header({ onPress }: Props) {
  const insets = useSafeAreaInsets();

  const height = 90 + insets.bottom;
  return (
    <S.Container height={height}>
      <Feather
        testID="go-back"
        style={{ marginTop: 16 }}
        onPress={onPress}
        name="arrow-left"
        color={colors.dark}
        size={32}
      />
    </S.Container>
  );
}
