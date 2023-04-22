import { Message } from '@app/components';
import React from 'react';
import * as S from './Home.styles';
import { useAuth } from '@app/hooks';

export function Home() {
  const { user } = useAuth();

  return (
    <S.Container>
      <Message
        title={`Olá ${user.name},`}
        description="Vimos que no momento não possui nenhuma lista criada. Clique no botão abaixo para criar uma nova lista e organizar suas compras."
      />
    </S.Container>
  );
}
