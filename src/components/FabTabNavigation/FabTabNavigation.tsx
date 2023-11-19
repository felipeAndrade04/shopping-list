import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as S from './FabTabNavigation.styles';
import { colors } from '@app/theme';
import { ActionModal } from '../ActionModal';
import { useShopping } from '@app/hooks/shopping';

export function FabTabNavigation() {
  const [show, setShow] = useState(false);
  const { create, isLoading } = useShopping();

  async function handleSuccessAction(name: string) {
    await create(name);
    setShow(false);
  }

  return (
    <>
      <S.Container onPress={() => setShow(true)} activeOpacity={0.7}>
        <Feather name="plus" color={colors.white} size={32} />
      </S.Container>
      <ActionModal
        title="Criar Lista"
        successActionText="Criar"
        show={show}
        isLoading={isLoading}
        close={() => setShow(false)}
        successAction={handleSuccessAction}
      />
    </>
  );
}
