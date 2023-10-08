import { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import * as S from './Quantity.styles';
import { QuantityProps } from './types';

export function Quantity({ initialValue, value, onChange }: QuantityProps) {
  const [quantity, setQuantity] = useState(initialValue || value || 1);

  function onIncrement() {
    const newValue = quantity + 1;

    onChange && onChange(newValue);
    setQuantity(newValue);
  }

  function onDecrement() {
    const newValue = quantity - 1;

    onChange && onChange(newValue);
    setQuantity(newValue);
  }

  return (
    <S.QuantityComponent testID="quantity">
      <S.QuantityButton onPress={onDecrement} testID="decrement-quantity">
        <AntDesign name="minus" size={18} color="white" />
      </S.QuantityButton>
      <S.QuantityValue>{quantity}</S.QuantityValue>
      <S.QuantityButton onPress={onIncrement} testID="increment-quantity">
        <AntDesign name="plus" size={18} color="white" />
      </S.QuantityButton>
    </S.QuantityComponent>
  );
}
