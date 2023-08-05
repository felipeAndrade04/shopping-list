import { Message } from '@app/components';
import React from 'react';
import * as S from './Home.styles';
import { useAuth } from '@app/hooks';
import { useShopping } from '@app/hooks/shopping';
import { Text } from 'react-native';

export function Home() {
  const { user } = useAuth();
  const { shopping } = useShopping();

  return (
    <S.Container>
      {shopping.length ? (
        shopping.map((item) => <Text key={item.id}>{item.name}</Text>)
      ) : (
        <Message
          title={`Olá ${user.name},`}
          description="Vimos que no momento não possui nenhuma lista criada. Clique no botão abaixo para criar uma nova lista e organizar suas compras."
        />
      )}
    </S.Container>
  );
}
