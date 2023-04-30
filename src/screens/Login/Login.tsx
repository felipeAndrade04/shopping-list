import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Login.styles';
import { useAuth } from '@app/hooks';
import { LoginFormData, LoginProps } from './Login.types';
import { Controller, useForm } from 'react-hook-form';

export function Login({ navigation }: LoginProps) {
  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { login, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ email, password }) => {
      await login({ email, password });
    })();
  }

  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />
      <Message title="Olá," description="faça login para começar." />

      <S.InputsContainer>
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input value={value} onChangeText={onChange} onBlur={onBlur} placeholder="E-mail" />
          )}
        />

        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input value={value} onChangeText={onChange} onBlur={onBlur} placeholder="Senha" />
          )}
        />
        <S.SimpleButton onPress={() => onNavigation('ForgotPassword')}>
          <S.SimpleButtonBoldText>Recuperar senha</S.SimpleButtonBoldText>
        </S.SimpleButton>
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        {isLoading ? 'Carregando' : 'Entrar'}
      </Button>

      <S.SimpleButton onPress={() => onNavigation('Register')}>
        <S.SimpleButtonText>
          Ainda não possui um cadastro?<S.SimpleButtonBoldText> Criar conta</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}
