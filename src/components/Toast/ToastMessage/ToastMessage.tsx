/* eslint-disable no-unused-vars */
import { Toast, ToastType } from '@app/utils/toast';
import * as S from './ToastMessage.styles';
import { AntDesign } from '@expo/vector-icons';
import { ReactNode, useCallback, useEffect } from 'react';

export interface ToastMessageProps {
  message: Toast;
  onRemoveMessage: (id: string) => void;
}

const icon: Record<ToastType, ReactNode> = {
  info: <AntDesign name="infocirlceo" size={24} color="white" />,
  success: <AntDesign name="checkcircleo" size={24} color="white" />,
  error: <AntDesign name="closecircleo" size={24} color="white" />,
};

export function ToastMessage({ message, onRemoveMessage }: ToastMessageProps) {
  const { text, type, duration, id } = message;

  const handleRemoveToast = useCallback(() => {
    onRemoveMessage(id);
  }, [id, onRemoveMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  });

  return (
    <S.Container type={type} onPress={handleRemoveToast} activeOpacity={0.7}>
      {icon[type]}
      <S.Message>{text}</S.Message>
    </S.Container>
  );
}
