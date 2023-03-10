import { Empty } from '@app/components';
import React from 'react';
import * as S from './Home.styles';

export function Home() {
  return (
    <S.Container>
      <Empty
        title="Olá Felipe,"
        description="Vimos que no momento não possui nenhuma lista criada. Clique no botão abaixo para criar uma nova lista e organizar suas compras."
      />
    </S.Container>
  );
}
