import { Firestore, addDoc, collection, onSnapshot, query } from 'firebase/firestore';
import { ShoppingService } from './shopping.types';
import { Shopping } from '@app/models';

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
      };

      const docRef = await addDoc(collection(this.db, this.key), newShopping);

      return {
        id: docRef.id,
        ...newShopping,
      };
    } catch (error) {
      console.tron.log(error);
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
          id: doc.id,
          ...doc.data(),
        } as Shopping);
      });
      setState(shoppingList);
    });
  }
}
