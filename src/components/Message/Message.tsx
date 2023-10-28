import React from 'react';
import * as S from './Message.styles';
import emptyAsset from '../../assets/images/empty.png';
import { MessageProps } from '.';

export function Message({ description, title, showImage = true }: MessageProps) {
  return (
    <S.Container>
      {showImage && <S.Image source={emptyAsset} testID="message-image" />}
      <S.Title>{title}</S.Title>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}
