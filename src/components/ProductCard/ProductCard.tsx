import { Checkbox } from '@app/components/Checkbox';
import { Quantity } from '@app/components/Quantity';
import { Spacer } from '@app/components/Spacer';
import { useState } from 'react';
import * as S from './ProductCard.styles';
import { ProductCardProps } from './ProductCard.types';

export function ProductCard({
  product,
  isChecked: isCheckedProp,
  changeQuantity,
  changeSelectedProduct,
}: ProductCardProps) {
  const [isChecked, setIsChecked] = useState(isCheckedProp);
  const [quantity, setQuantity] = useState(product?.quantity);

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
