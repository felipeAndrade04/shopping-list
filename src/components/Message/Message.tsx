import React from 'react';
import * as S from './Message.styles';
import emptyAsset from '../../assets/images/empty.png';
import { MessageProps } from '.';

export function Message({ description, title }: MessageProps) {
  return (
    <S.Container>
      <S.Image source={emptyAsset} />
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}
