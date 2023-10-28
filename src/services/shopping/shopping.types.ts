/* eslint-disable no-unused-vars */

import { Product, Shopping } from '@app/models';
import { Unsubscribe } from 'firebase/auth';

export interface ShoppingService {
  create: (name: string) => Promise<Shopping>;
  list: (setState: (data: Shopping[]) => void) => Unsubscribe;
  updateProducts: (shoppingId: string, products: Product[]) => Promise<void>;
}
