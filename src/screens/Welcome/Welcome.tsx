import { Button, Message } from '@app/components';
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
      <S.Buttons>
        <Button>Entrar</Button>
        <Button variant="outline" margin="24px 0 0 0">
          Criar uma conta
        </Button>
      </S.Buttons>
    </S.Container>
  );
}
