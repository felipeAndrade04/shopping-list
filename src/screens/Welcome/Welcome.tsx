import { Message } from '@app/components';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Welcome.styles';

export function Welcome() {
  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message
        title="Olá!"
        description="Comece agora a organizar suas idas ao mercado com lista de compras personalizadas e compartilháveis!"
      />
    </S.Container>
  );
}
