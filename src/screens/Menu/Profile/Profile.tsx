import * as S from './Profile.styles';
import { useAuth } from '@app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormWrapper, Input, Spacer } from '@app/components';
import * as z from 'zod';
import { colors } from '@app/theme';
import { ProfileProps } from './Profile.types';

const schema = z
  .object({
    name: z.string().nonempty('Campo obrigatório'),
    password: z.string().min(8, 'A senha precisa de 8 caracteres').optional(),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type ProfileFormData = z.infer<typeof schema>;

export function Profile({ navigation }: ProfileProps) {
  const { user, isLoading, updateFullProfile } = useAuth();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ProfileFormData>({
    mode: 'all',
    defaultValues: {
      name: user.name,
    },
    resolver: zodResolver(schema),
  });

  function onSubmit() {
    handleSubmit(async ({ name, password }: ProfileFormData) => {
      try {
        await updateFullProfile(password, { name });
        navigation.goBack();
      } catch {}
    })();
  }

  return (
    <FormWrapper>
      <S.Container>
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
                borderColor={colors.dark}
                borderWidth={1}
              />
            )}
          />

          <Spacer dimesion={16} />

          <Input
            value={user.email}
            placeholder="E-mail"
            testID="input-email"
            borderColor={colors.dark}
            borderWidth={1}
            disabled
          />

          <Spacer dimesion={32} />
          <S.Title>Alterar Senha</S.Title>
          <Spacer dimesion={16} />

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
                placeholder="Senha Nova"
                testID="input-password"
                borderColor={colors.dark}
                borderWidth={1}
              />
            )}
          />
          <Spacer dimesion={16} />
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
                borderColor={colors.dark}
                borderWidth={1}
              />
            )}
          />
        </S.InputsContainer>

        <Button isLoading={isLoading} onPress={onSubmit}>
          Atualizar
        </Button>
      </S.Container>
    </FormWrapper>
  );
}
