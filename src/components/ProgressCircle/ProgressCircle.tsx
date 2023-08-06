import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import * as S from './ProgressCircle.styles';
import { ProgressCircleProps } from './ProgressCircle.types';

export function ProgressCircle({ progress = 0, size = 50 }: ProgressCircleProps) {
  const animatedProgress = useRef(new Animated.Value(0)).current;

  const animateProgress = useRef((toValue: number) => {
    Animated.spring(animatedProgress, {
      toValue,
      useNativeDriver: false,
    }).start();
  }).current;

  useEffect(() => {
    animateProgress(progress);
  }, [animateProgress, progress]);

  const firstIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 50],
    outputRange: ['0deg', '180deg'],
    extrapolate: 'clamp',
  });

  const secondIndicatorRotate = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0deg', '360deg'],
    extrapolate: 'clamp',
  });

  const secondIndictorVisibility = animatedProgress.interpolate({
    inputRange: [0, 49, 50, 100],
    outputRange: [0, 0, 1, 1],
    extrapolate: 'clamp',
  });

  return (
    <S.EmptyCircle size={size}>
      <S.Indicator style={{ transform: [{ rotate: firstIndicatorRotate }] }} size={size} />
      <S.CoverIndicator size={size} />
      <S.Indicator
        size={size}
        style={{
          transform: [{ rotate: secondIndicatorRotate }],
          opacity: secondIndictorVisibility,
        }}
      />
    </S.EmptyCircle>
  );
}
