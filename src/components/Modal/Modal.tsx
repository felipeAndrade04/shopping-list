import React from 'react';
import * as S from './Modal.styles';
import { ModalProps } from './Modal.types';

export function Modal({ children, show, close }: ModalProps) {
  return (
    <S.Container
      animationType="fade"
      transparent={true}
      visible={show}
      onRequestClose={() => {
        close();
      }}
    >
      <S.Overlay onPress={() => close()} testID="overlay">
        <S.Content>{children}</S.Content>
      </S.Overlay>
    </S.Container>
  );
}
