import React from 'react';
import { Modal } from '../Modal';
import { ActionModalProps } from './ActionModal.types';
import * as S from './ActionModal.styles';
import { Input } from '../Input';
import { Button } from '../Button';
import { colors } from '@app/theme';
import { Spacer } from '../Spacer';

export function ActionModal({
  show,
  title,
  successActionText,
  close,
  successAction,
}: ActionModalProps) {
  return (
    <Modal show={show} close={close}>
      <S.Container>
        <S.Title>{title}</S.Title>
        <Spacer dimesion={24} />
        <Input placeholder="Informe o nome" />
        <Spacer dimesion={48} />
        <S.Actions>
          <S.Action>
            <Button onPress={close} variant="outline" color={colors.red}>
              Cancelar
            </Button>
          </S.Action>
          <Spacer dimesion={16} />
          <S.Action>
            <Button onPress={successAction}>{successActionText}</Button>
          </S.Action>
        </S.Actions>
      </S.Container>
    </Modal>
  );
}
