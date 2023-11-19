/* eslint-disable no-unused-vars */
import { Toast, ToastType } from '@app/utils/toast';
import * as S from './ToastMessage.styles';
import { AntDesign } from '@expo/vector-icons';
import { ReactNode, useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const { text, type, duration, id } = message;

  const handleRemoveToast = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        onRemoveMessage(id);
      }
    });
  }, [id, onRemoveMessage]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleRemoveToast();
    }, duration || 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [150, 0],
            }),
          },
        ],
      }}
    >
      <S.Container type={type} onPress={handleRemoveToast} activeOpacity={0.7}>
        {icon[type]}
        <S.Message>{text}</S.Message>
      </S.Container>
    </Animated.View>
  );
}
