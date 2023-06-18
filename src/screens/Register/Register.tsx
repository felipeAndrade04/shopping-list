import { Button, Input, Message, Spacer } from '@app/components';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Register.styles';
import { useAuth } from '@app/hooks';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import { RegisterProps } from './Register.types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z
  .object({
    name: z.string().nonempty('Campo obrigatório'),
    email: z.string().nonempty('Campo obrigatório').email('Informe um email válido').toLowerCase(),
    password: z.string().nonempty('Campo obrigatório').min(8, 'A senha precisa de 8 caracteres'),
    confirmPassword: z.string().nonempty('Campo obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof schema>;

export function Register({ navigation }: RegisterProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(schema),
  });
  const { register, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ name, email, password }: RegisterFormData) => {
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
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              error={errors.name?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nome"
              testID="input-name"
            />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="email"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              error={errors.email?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="E-mail"
              testID="input-email"
            />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="password"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              error={errors.password?.message}
              inputPassword={true}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Senha"
              testID="input-password"
            />
          )}
        />
        <Spacer dimesion={12} />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              error={errors.confirmPassword?.message}
              inputPassword={true}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirmação de Senha"
              testID="input-confirm-password"
            />
          )}
        />
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24} isLoading={isLoading}>
        Criar conta
      </Button>

      <S.SimpleButton onPress={() => onNavigation('Login')} testID="login">
        <S.SimpleButtonText>
          Já possui um cadastro?<S.SimpleButtonBoldText> Entrar</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}
