/* eslint-disable no-unused-vars */
export interface ProductType {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

export interface ProductCardProps {
  product: ProductType;
  changeSelectedProduct?: (product: ProductType, value: boolean) => void;
  changeQuantity?: (productId: string, quantity: number) => void;
}
