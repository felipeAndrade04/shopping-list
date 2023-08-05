import { auth, db } from '@app/config';
import { FirebaseAuthentication } from './auth/firebase-authentication';
import { FirebaseShopping } from './shopping/firebase-shopping';

const services = {
  auth: new FirebaseAuthentication(auth),
  shopping: new FirebaseShopping(db),
};

export default services;
