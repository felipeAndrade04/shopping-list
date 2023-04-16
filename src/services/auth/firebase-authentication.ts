import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { Authentication, LoginParams, RegisterParams } from './auth.types';

export class FirebaseAuthentication implements Authentication {
  constructor(private readonly auth: Auth) {
    this.auth = auth;
  }

  async login(params: LoginParams): Promise<UserCredential> {
    try {
      const { email, password } = params;

      const response = await signInWithEmailAndPassword(this.auth, email, password);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async register(params: RegisterParams): Promise<UserCredential> {
    try {
      const { name, email, password } = params;

      const response = await createUserWithEmailAndPassword(this.auth, email, password);

      await updateProfile(response.user, { displayName: name });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    console.log('logout');
  }

  async forgotPassword() {
    console.log('forgotPassword');
  }
}
