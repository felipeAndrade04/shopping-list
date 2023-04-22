/* eslint-disable no-unused-vars */

import { User } from '@app/models';

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
  register: (params: RegisterParams) => Promise<User>;
  login: (params: LoginParams) => Promise<User>;
  logout: () => void;
  forgotPassword: (email: string) => void;
}
