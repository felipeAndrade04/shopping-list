import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
  sendPasswordResetEmail,
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
      console.tron.log(error);
    }
  }

  async register(params: RegisterParams): Promise<UserCredential> {
    try {
      const { name, email, password } = params;

      const response = await createUserWithEmailAndPassword(this.auth, email, password);

      await updateProfile(response.user, { displayName: name });

      return response;
    } catch (error) {
      console.tron.log(error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.tron.log(error);
    }
  }

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      console.tron.log(error);
    }
  }
}
