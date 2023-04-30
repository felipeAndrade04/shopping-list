import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './ForgotPassword.styles';
import { useAuth } from '@app/hooks';
import { ForgotPasswordFormData, ForgotPasswordProps } from './ForgotPassword.types';
import { Controller, useForm } from 'react-hook-form';

export function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const { control, handleSubmit } = useForm<ForgotPasswordFormData>({
    defaultValues: {
      email: '',
    },
  });
  const { forgotPassword, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ email }) => {
      await forgotPassword(email);
      onNavigation('Login');
    })();
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

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input value={value} onChangeText={onChange} placeholder="Informe o email registrado" />
        )}
      />
      <Spacer dimesion={12} />

      <Button onPress={onSubmit} marginTop={24} marginBottom={24}>
        {isLoading ? 'Carregando' : 'Enviar'}
      </Button>
    </S.Container>
  );
}
