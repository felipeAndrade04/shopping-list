import { Message, ShoppingList } from '@app/components';
import React from 'react';
import * as S from './Home.styles';
import { useAuth } from '@app/hooks';
import { useShopping } from '@app/hooks/shopping';

export function Home() {
  const { user } = useAuth();
  const { shopping } = useShopping();

  return (
    <S.Container>
      {shopping.length ? (
        <ShoppingList data={shopping} />
      ) : (
        <Message
          title={`Olá ${user.name},`}
          description="Vimos que no momento não possui nenhuma lista criada. Clique no botão abaixo para criar uma nova lista e organizar suas compras."
        />
      )}
    </S.Container>
  );
}
