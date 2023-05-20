import React, { ReactNode } from 'react';
import { renderHook, waitFor } from '@testing-library/react-native';
import { useAuth } from './use-auth';
import services from '@app/services';
import { Authentication, LoginParams, RegisterParams } from '@app/services/auth';
import { store } from '@app/store';
import { Provider } from 'react-redux';

jest.mock('@app/services', () => ({
  auth: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    forgotPassword: jest.fn(),
  } as Partial<Authentication>,
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.spyOn(services.auth, 'login').mockImplementation((user: LoginParams) => {
      return new Promise((resolve) => {
        resolve({
          id: '1',
          name: 'teste',
          email: user.email,
        });
      });
    });
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  it('Should be login correctly', async () => {
    const user: LoginParams = {
      email: 'teste@email.com',
      password: '123456',
    };
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.login(user);
    });

    expect(services.auth.login).toBeCalledWith(user);
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('Should be register correctly', async () => {
    const user: RegisterParams = {
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    };
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.register(user);
    });

    expect(services.auth.register).toBeCalledWith(user);
    expect(services.auth.login).toBeCalledWith({ email: user.email, password: user.password });
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('Should be logout correctly', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.logout();
    });

    expect(services.auth.logout).toBeCalledTimes(1);
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBeFalsy();
  });

  it('Should be forgot password correctly', async () => {
    const email = 'teste@teste.com';
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.forgotPassword(email);
    });

    expect(services.auth.forgotPassword).toBeCalledWith(email);
    expect(result.current.isAuthenticated).toBeFalsy();
  });
});
