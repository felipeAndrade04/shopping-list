import { auth } from '@app/config';
import { FirebaseAuthentication } from './auth/firebase-authentication';

const services = {
  auth: new FirebaseAuthentication(auth),
};

export default services;
