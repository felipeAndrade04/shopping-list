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
    password: z.string().nonempty('Campo obrigatório').min(8, 'A senha precisa de 8 carateres'),
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
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              error={errors.name?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Nome"
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
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Senha"
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
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Confirmação de Senha"
            />
          )}
        />
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24} isLoading={isLoading}>
        Criar conta
      </Button>

      <S.SimpleButton onPress={() => onNavigation('Login')}>
        <S.SimpleButtonText>
          Já possui um cadastro?<S.SimpleButtonBoldText> Entrar</S.SimpleButtonBoldText>
        </S.SimpleButtonText>
      </S.SimpleButton>
    </S.Container>
  );
}
