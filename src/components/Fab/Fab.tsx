import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import * as S from './Fab.styles';
import { colors } from '@app/theme';
import { ActionModal } from '../ActionModal';

export function Fab() {
  const [show, setShow] = useState(false);

  return (
    <>
      <S.Container onPress={() => setShow(true)} activeOpacity={0.7}>
        <Feather name="plus" color={colors.white} size={32} />
      </S.Container>
      <ActionModal
        title="Criar Lista"
        successActionText="Criar"
        show={show}
        close={() => setShow(false)}
        successAction={() => console.tron.log('Success')}
      />
    </>
  );
}
