import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackNavigationProps, AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import * as S from './ForgotPassword.styles';
import { useAuth } from '@app/hooks';

interface Props {
  navigation: AuthStackNavigationProps;
}

export function ForgotPassword({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const { forgotPassword, isLoading } = useAuth();

  function onSubmit() {
    forgotPassword(email);
    onNavigation('Login');
  }

  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message
        title="Recuperação de senha"
        description="Não se preocupe! Acontece. Insira o endereço associado à sua conta"
        showImage={false}
      />

      <Spacer dimesion={60} />

      <Input value={email} onChangeText={setEmail} placeholder="Informe o email registrado" />
      <Spacer dimesion={12} />

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        {isLoading ? 'Carregando' : 'Enviar'}
      </Button>
    </S.Container>
  );
}
