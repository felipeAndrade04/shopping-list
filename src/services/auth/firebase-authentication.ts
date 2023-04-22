import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { Authentication, LoginParams, RegisterParams } from './auth.types';
import { User } from '@app/models';

export class FirebaseAuthentication implements Authentication {
  constructor(private readonly auth: Auth) {
    this.auth = auth;
  }

  async login(params: LoginParams): Promise<User> {
    try {
      const { email, password } = params;

      const response = await signInWithEmailAndPassword(this.auth, email, password);

      const user: User = {
        email: response.user.email,
        name: response.user.displayName,
        id: response.user.uid,
      };

      return user;
    } catch (error) {
      console.tron.log(error);
    }
  }

  async register(params: RegisterParams): Promise<User> {
    try {
      const { name, email, password } = params;

      const response = await createUserWithEmailAndPassword(this.auth, email, password);

      await updateProfile(response.user, { displayName: name });

      const user: User = {
        email: response.user.email,
        name: response.user.displayName,
        id: response.user.uid,
      };

      return user;
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
