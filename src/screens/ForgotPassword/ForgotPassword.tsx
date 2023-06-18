import { Button, Input, Message, Spacer } from '@app/components';
import { AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './ForgotPassword.styles';
import { useAuth } from '@app/hooks';
import { ForgotPasswordProps } from './ForgotPassword.types';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().nonempty('Campo obrigatório').email('Informe um email válido').toLowerCase(),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

export function ForgotPassword({ navigation }: ForgotPasswordProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormData>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });
  const { forgotPassword, isLoading } = useAuth();

  function onSubmit() {
    handleSubmit(async ({ email }: ForgotPasswordFormData) => {
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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            value={value}
            error={errors.email?.message}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Informe o email registrado"
            testID="input-email"
          />
        )}
      />
      <Spacer dimesion={12} />

      <Button onPress={onSubmit} marginTop={24} marginBottom={24} isLoading={isLoading}>
        Enviar
      </Button>
    </S.Container>
  );
}
