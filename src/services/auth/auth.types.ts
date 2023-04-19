/* eslint-disable no-unused-vars */

import { UserCredential } from 'firebase/auth';

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface Authentication {
  register: (params: RegisterParams) => Promise<UserCredential>;
  login: (params: LoginParams) => Promise<UserCredential>;
  logout: () => void;
  forgotPassword: (email: string) => void;
}
