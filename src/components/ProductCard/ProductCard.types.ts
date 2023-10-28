/* eslint-disable no-unused-vars */
import { Product } from '@app/models';

export interface ProductCardProps {
  product: Product;
  isChecked: boolean;
  changeSelectedProduct?: (product: Product, value: boolean) => void;
  changeQuantity?: (productId: string, quantity: number) => void;
}
