import React, { useState } from 'react';
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
  isLoading,
  close,
  successAction,
}: ActionModalProps) {
  const [name, setName] = useState('');

  async function handleSuccess() {
    await successAction(name);
    setName('');
  }

  return (
    <Modal show={show} close={close}>
      <S.Container>
        <S.Title>{title}</S.Title>
        <Spacer dimesion={24} />
        <Input
          value={name}
          onChangeText={(event) => setName(event)}
          placeholder="Informe o nome"
          borderColor={colors.dark}
          borderWidth={1}
        />
        <Spacer dimesion={48} />
        <S.Actions>
          <S.Action>
            <Button onPress={close} variant="outline" color={colors.red} testID="cancelButton">
              Cancelar
            </Button>
          </S.Action>
          <Spacer dimesion={16} />
          <S.Action>
            <Button onPress={handleSuccess} isLoading={isLoading} testID="successButton">
              {successActionText}
            </Button>
          </S.Action>
        </S.Actions>
      </S.Container>
    </Modal>
  );
}
