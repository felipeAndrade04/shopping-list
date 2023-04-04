import { Button, Message, Spacer } from '@app/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Welcome.styles';

export function Welcome() {
  const navigation = useNavigation();

  function onNavigation(name: string) {
    navigation.navigate(name, {});
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message
        title="Olá!"
        description="Comece agora a organizar suas idas ao mercado com lista de compras personalizadas e compartilháveis!"
      />
      <S.Buttons>
        <Button onPress={() => onNavigation('Login')}>Entrar</Button>
        <Spacer dimesion={16} />
        <Button variant="outline">Criar uma conta</Button>
      </S.Buttons>
    </S.Container>
  );
}
