import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  updatePassword,
} from 'firebase/auth';
import { Authentication, LoginParams, RegisterParams, UpdateProfileParams } from './auth.types';
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
      throw new Error('Login failed');
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
      throw new Error('Register failed');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw new Error('Logout failed');
    }
  }

  async forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error) {
      throw new Error('Forgot password failed');
    }
  }

  async updateProfile(params: UpdateProfileParams) {
    try {
      await updateProfile(this.auth.currentUser, {
        displayName: params.name,
        photoURL: params.imageUrl,
      });
    } catch (error) {
      throw new Error('Forgot password failed');
    }
  }

  async updatePassword(newPassword: string) {
    try {
      await updatePassword(this.auth.currentUser, newPassword);
    } catch (error) {
      throw new Error('Update password failed');
    }
  }
}
