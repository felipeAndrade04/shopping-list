import { auth, db, storage } from '@app/config';
import { FirebaseAuthentication } from './auth/firebase-authentication';
import { FirebaseShopping } from './shopping/firebase-shopping';
import { FirebaseStorage } from './storage/firebase-storage';

interface Services {
  auth: FirebaseAuthentication;
  storage: FirebaseStorage;
  shopping?: FirebaseShopping;
}

const services: Services = {
  auth: new FirebaseAuthentication(auth),
  storage: new FirebaseStorage(storage),
};

export function buildShoppingServices(id: string) {
  services.shopping = new FirebaseShopping(db, id);
}

export default services;
