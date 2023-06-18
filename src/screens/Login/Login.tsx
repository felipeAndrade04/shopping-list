import { Button, Input, Message, Spacer, FormWrapper } from '@app/components';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Login.styles';
import { useAuth } from '@app/hooks';
import { LoginProps } from './Login.types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import logo from '@app/assets/images/logo.png';

const schema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('Informe um email válido').toLowerCase(),
  password: z.string().nonempty('Campo obrigatório').min(8, 'A senha precisa de 8 caracteres'),
});

type LoginFormData = z.infer<typeof schema>;

export function Login({ navigation }: LoginProps) {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });
  const { login, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ email, password }: LoginFormData) => {
      await login({ email, password });
    })();
  }

  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <FormWrapper>
      <S.Container>
        <StatusBar barStyle={'dark-content'} />
        <S.Logo source={logo} />
        <Message showImage={false} title="Olá," description="faça login para começar." />

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
          <S.SimpleButton onPress={() => onNavigation('ForgotPassword')}>
            <S.SimpleButtonBoldText>Recuperar senha</S.SimpleButtonBoldText>
          </S.SimpleButton>
        </S.InputsContainer>

        <Button
          enabled={isValid}
          onPress={onSubmit}
          marginTop={24}
          marginBottom={24}
          isLoading={isLoading}
        >
          Entrar
        </Button>

        <S.SimpleButton testID="register" onPress={() => onNavigation('Register')}>
          <S.SimpleButtonText>
            Ainda não possui um cadastro?
            <S.SimpleButtonBoldText> Criar conta</S.SimpleButtonBoldText>
          </S.SimpleButtonText>
        </S.SimpleButton>
      </S.Container>
    </FormWrapper>
  );
}
