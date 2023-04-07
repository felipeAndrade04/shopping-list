import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackNavigationProps, AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as S from './Login.styles';

interface Props {
  navigation: AuthStackNavigationProps;
}

export function Login({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function onSubmit() {
    console.log(email, password);
  }

  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message title="Olá," description="faça login para começar." />

      <S.InputsContainer>
        <Input value={email} onChangeText={setEmail} placeholder="E-mail" />
        <Spacer dimesion={12} />
        <Input value={password} onChangeText={setPassword} placeholder="Senha" />
        <S.SimpleButton>
          <S.SimpleButtonBoldText>Recuperar senha</S.SimpleButtonBoldText>
        </S.SimpleButton>
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        Entrar
      </Button>

      <S.SimpleButton onPress={() => onNavigation('Register')}>
        <S.SimpleButtonText>
          Ainda não possui um cadastro?<S.SimpleButtonBoldText> Criar conta</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}
