/* eslint-disable no-unused-vars */

import { Shopping } from '@app/models';
import { Unsubscribe } from 'firebase/auth';

export interface ShoppingService {
  create: (name: string) => Promise<Shopping>;
  list: (setState: (data: Shopping[]) => void) => Unsubscribe;
}
