import {
  Firestore,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ShoppingService } from './shopping.types';
import { Product, Shopping } from '@app/models';

export class FirebaseShopping implements ShoppingService {
  private key = 'shopping';

  constructor(private readonly db: Firestore, private readonly userId: string) {
    this.db = db;
    this.userId = userId;
  }

  async create(name: string) {
    try {
      const newShopping: Omit<Shopping, 'id'> = {
        name,
        created_at: new Date(),
        userId: this.userId,
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
    const shoppingRef = collection(this.db, this.key);
    const q = query(shoppingRef, orderBy('created_at', 'desc'), where('userId', '==', this.userId));
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
