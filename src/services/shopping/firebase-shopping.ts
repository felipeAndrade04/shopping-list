import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from 'firebase/firestore';
import { ShoppingService } from './shopping.types';
import { Product, Shopping } from '@app/models';

export class FirebaseShopping implements ShoppingService {
  private key = 'shopping';

  constructor(private readonly db: Firestore) {
    this.db = db;
  }

  async create(name: string) {
    try {
      const newShopping: Omit<Shopping, 'id'> = {
        name,
        created_at: new Date(),
        products: [],
      };

      const docRef = await addDoc(collection(this.db, this.key), newShopping);

      return {
        id: docRef.id,
        ...newShopping,
      };
    } catch (error) {
      throw new Error('Fail to create shopping');
    }
  }

  // eslint-disable-next-line no-unused-vars
  list(setState: (data: Shopping[]) => void) {
    const q = query(collection(this.db, this.key));
    return onSnapshot(q, (querySnapshot) => {
      const shoppingList: Shopping[] = [];
      querySnapshot.forEach((doc) => {
        shoppingList.push({
          ...doc.data(),
          id: doc.id,
          created_at: doc.data().created_at.toDate(),
        } as Shopping);
      });
      setState(shoppingList);
    });
  }

  async updateProducts(shoppingId: string, products: Product[]) {
    const shoppingRef = doc(this.db, this.key, shoppingId);
    await updateDoc(shoppingRef, { products });
  }
}
