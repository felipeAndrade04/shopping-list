import React from 'react';
import { StatusBar } from 'react-native';
import * as S from './Welcome.styles';
import { Button, Message, Spacer } from '@app/components';
import { AuthStackNavigationProps, AuthStackParamList } from '@app/navigation/stackNavigation/auth';
import Logo from '@app/assets/images/largeLogo.svg';

interface Props {
  navigation: AuthStackNavigationProps;
}

export function Welcome({ navigation }: Props) {
  function onNavigation(name: keyof AuthStackParamList) {
    navigation.navigate(name);
  }

  return (
    <S.Container>
      <StatusBar barStyle={'dark-content'} />

      <S.LogoContainer>
        <Logo />
      </S.LogoContainer>

      <Message
        showImage={false}
        title="Olá!"
        description="Comece agora a organizar suas idas ao mercado com lista de compras personalizadas e compartilháveis!"
      />
      <S.Buttons>
        <Button onPress={() => onNavigation('Login')}>Entrar</Button>
        <Spacer dimesion={16} />
        <Button variant="outline" onPress={() => onNavigation('Register')}>
          Criar uma conta
        </Button>
      </S.Buttons>
    </S.Container>
  );
}
