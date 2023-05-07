import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Login.styles';
import { useAuth } from '@app/hooks';
import { LoginProps } from './Login.types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('Informe um email válido').toLowerCase(),
  password: z.string().nonempty('Campo obrigatório').min(8, 'A senha precisa de 8 carateres'),
});

type LoginFormData = z.infer<typeof schema>;

export function Login({ navigation }: LoginProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
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
        <S.SimpleButton onPress={() => onNavigation('ForgotPassword')}>
          <S.SimpleButtonBoldText>Recuperar senha</S.SimpleButtonBoldText>
        </S.SimpleButton>
      </S.InputsContainer>

      <Button onPress={onSubmit} marginTop={24} marginBottom={24} isLoading={isLoading}>
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
