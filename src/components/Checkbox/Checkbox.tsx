import { FontAwesome5 } from '@expo/vector-icons';
import * as S from './Checkbox.styles';
import { useState } from 'react';
import { CheckboxProps } from './Checkbox.types';
import { View } from 'react-native';

export function Checkbox({ value, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(value);

  function handleChangeValue() {
    setIsChecked((prevState) => {
      onChange(!prevState);
      return !prevState;
    });
  }

  return (
    <S.CheckboxContainer value={isChecked} onPress={handleChangeValue} testID="checkbox">
      {isChecked && (
        <View testID="checkbox-icon">
          <FontAwesome5 name="check" size={12} color="white" />
        </View>
      )}
    </S.CheckboxContainer>
  );
}
