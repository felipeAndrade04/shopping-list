import { Button, Input, Message, Spacer } from '@app/components';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Register.styles';
import { useAuth } from '@app/hooks';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import { RegisterFormData, RegisterProps } from './Register.types';
import { Controller, useForm } from 'react-hook-form';

export function Register({ navigation }: RegisterProps) {
  const { control, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });
  const { register, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ name, email, password }) => {
      await register({ name, email, password });
    })();
  }

  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message title="Olá," description="crie sua conta agora." />

      <S.InputsContainer>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Nome" />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="E-mail" />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Senha" />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, value } }) => (
            <Input value={value} onChangeText={onChange} placeholder="Confirmação de Senha" />
          )}
        />
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        {isLoading ? 'Carregando...' : 'Criar conta'}
      </Button>

      <S.SimpleButton onPress={() => onNavigation('Login')}>
        <S.SimpleButtonText>
          Já possui um cadastro?<S.SimpleButtonBoldText> Entrar</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}
