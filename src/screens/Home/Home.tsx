import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as S from './Home.styles';

export function Home() {
  return (
    <S.Container>
      <TouchableOpacity onPress={() => console.tron.log('teste')}>
        <S.Text>Home</S.Text>
      </TouchableOpacity>
    </S.Container>
  );
}
