import { Checkbox, Quantity, Spacer } from '@app/components';
import { useState } from 'react';
import * as S from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';

export function ProductCard({ product, changeQuantity, changeSelectedProduct }: ProductCardProps) {
  const [isChecked, setIsChecked] = useState(product.checked);
  const [quantity, setQuantity] = useState(1);

  function onChangeQuantity(quantity: number) {
    changeQuantity(product.id, quantity);
    setQuantity(quantity);
  }

  function onChangeCheckbox(value: boolean) {
    if (!value) {
      setQuantity(1);
    }
    changeSelectedProduct(product, value);
    setIsChecked(value);
  }

  return (
    <S.Product>
      <S.LeftProductInfo>
        <Checkbox value={isChecked} onChange={onChangeCheckbox} />
        <Spacer dimesion={12} />
        <S.ProductName>{product.name}</S.ProductName>
      </S.LeftProductInfo>

      {isChecked && <Quantity value={quantity} onChange={onChangeQuantity} />}
    </S.Product>
  );
}
