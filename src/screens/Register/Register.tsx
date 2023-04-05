import { Button, Input, Message, Spacer } from '@app/components';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as S from './Register.styles';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  function onSubmit() {
    console.log(name, email, password, passwordConfirmation);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message title="Olá," description="crie sua conta agora." />

      <S.InputsContainer>
        <Input value={name} onChangeText={setName} placeholder="Nome" />
        <Spacer dimesion={12} />
        <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        <Spacer dimesion={12} />
        <Input value={password} onChangeText={setPassword} placeholder="Senha" />
        <Spacer dimesion={12} />
        <Input
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
          placeholder="Confirmação de Senha"
        />
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        Criar conta
      </Button>

      <S.SimpleButton>
        <S.SimpleButtonText>
          Já possui um cadastro?<S.SimpleButtonBoldText> Entrar</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}