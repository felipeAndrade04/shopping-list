import { Button, Input, Message, Spacer } from '@app/components';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as S from './Login.styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    console.log(email, password);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message title="Olá," description="faça login para começar." />

      <S.InputsContainer>
        <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        <Spacer dimesion={12} />
        <Input value={password} onChangeText={setPassword} placeholder="Senha" />
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24}>
        Entrar
      </Button>
    </S.Container>
  );
}
