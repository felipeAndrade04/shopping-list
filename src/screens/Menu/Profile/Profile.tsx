import * as S from './Profile.styles';
import { useAuth } from '@app/hooks';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Button, FormWrapper, Input, ProfileImage, Spacer } from '@app/components';
import * as z from 'zod';
import { colors } from '@app/theme';
import { ProfileProps } from './Profile.types';
import { useState } from 'react';

const schema = z
  .object({
    name: z.string().nonempty('Campo obrigatório'),
    password: z.string().min(8, 'A senha precisa de 8 caracteres').optional(),
    confirmPassword: z.string().optional(),
    imageUrl: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não correspondem',
    path: ['confirmPassword'],
  });

type ProfileFormData = z.infer<typeof schema>;

export function Profile({ navigation }: ProfileProps) {
  const [disabled, setDisabled] = useState(true);
  const { user, isLoading, updateFullProfile, uploadProfileImage } = useAuth();
  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    setValue,
  } = useForm<ProfileFormData>({
    mode: 'all',
    defaultValues: {
      name: user.name,
      imageUrl: user.imageUrl,
    },
    resolver: zodResolver(schema),
  });

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setValue('imageUrl', result.assets[0].uri);
      setDisabled(false);
    }
  }

  function onSubmit() {
    handleSubmit(async ({ name, imageUrl, password }: ProfileFormData) => {
      try {
        const resp = await uploadProfileImage(imageUrl, `profile/${user.email}`);

        await updateFullProfile(password, { name, imageUrl: resp.downloadUrl });

        navigation.goBack();
      } catch {}
    })();
  }

  return (
    <FormWrapper>
      <S.Container>
        <S.InputsContainer>
          <S.ProfileImageContainer>
            <S.ProfileImageContent>
              <Controller
                control={control}
                name="imageUrl"
                render={({ field: { value } }) => (
                  <ProfileImage name={user.name} size="lg" url={value} />
                )}
              />

              <S.EditProfileButton onPress={openImagePicker} activeOpacity={0.5}>
                <MaterialIcons name="edit" size={24} color={colors.white} />
              </S.EditProfileButton>
            </S.ProfileImageContent>
          </S.ProfileImageContainer>

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

        <Button isLoading={isLoading} enabled={isDirty || !disabled} onPress={onSubmit}>
          Atualizar
        </Button>
      </S.Container>
    </FormWrapper>
  );
}
