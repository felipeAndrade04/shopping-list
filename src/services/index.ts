import { auth, db, storage } from '@app/config';
import { FirebaseAuthentication } from './auth/firebase-authentication';
import { FirebaseShopping } from './shopping/firebase-shopping';
import { FirebaseStorage } from './storage/firebase-storage';

const services = {
  auth: new FirebaseAuthentication(auth),
  shopping: new FirebaseShopping(db),
  storage: new FirebaseStorage(storage),
};

export default services;
