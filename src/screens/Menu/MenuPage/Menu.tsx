import React from 'react';
import * as S from './Menu.styles';
import { Button, ProfileImage, Spacer } from '@app/components';
import { colors } from '@app/theme';
import { useAuth } from '@app/hooks';
import { View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { MenuProps } from './Menu.types';

export function Menu({ navigation }: MenuProps) {
  const { logout, user } = useAuth();

  function navigateToProfile() {
    navigation.navigate('Profile');
  }

  return (
    <S.Container>
      <S.HeaderContainer onPress={navigateToProfile} activeOpacity={0.5}>
        <S.Header>
          <S.LeftSection>
            <ProfileImage url={user.imageUrl} name={user.name} />
            <Spacer dimesion={16} />
            <View>
              <S.GreetingsText>Olá,</S.GreetingsText>
              <S.UserNameText>{user.name}</S.UserNameText>
            </View>
          </S.LeftSection>

          <Feather name="chevron-right" color={colors.gray[300]} size={32} />
        </S.Header>
      </S.HeaderContainer>

      <S.Footer>
        <Button onPress={logout} variant="outline" color={colors.red}>
          Sair
        </Button>
      </S.Footer>
    </S.Container>
  );
}
