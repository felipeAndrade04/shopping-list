import { renderHook, waitFor } from '@testing-library/react-native';
import { useAuth } from './use-auth';
import services from '@app/services';
import { Authentication, LoginParams, RegisterParams } from '@app/services/auth';
import { wrapper, resetStore } from '@app/utils/testUtils';

jest.mock('@app/services', () => ({
  auth: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
    forgotPassword: jest.fn(),
  } as Partial<Authentication>,
}));

describe('useAuth', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    resetStore();
  });

  it('Should be login correctly', async () => {
    const user: LoginParams = {
      email: 'teste@email.com',
      password: '123456',
    };
    jest.spyOn(services.auth, 'login').mockImplementation((user: LoginParams) => {
      return new Promise((resolve) => {
        resolve({
          id: '1',
          name: 'teste',
          email: user.email,
        });
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.login(user);
    });

    expect(services.auth.login).toBeCalledWith(user);
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('Should failed login', async () => {
    const user = {
      email: 'teste@email.com',
      password: '12345678',
    };
    jest.spyOn(services.auth, 'login').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Login failed'));
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.login(user);
    });

    expect(services.auth.login).toBeCalled();
    expect(services.auth.login).rejects.toThrow();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.user).toBeNull();
  });

  it('Should be register correctly', async () => {
    const user: RegisterParams = {
      name: 'Teste',
      email: 'teste@email.com',
      password: '123456',
    };
    jest.spyOn(services.auth, 'login').mockImplementation((user: LoginParams) => {
      return new Promise((resolve) => {
        resolve({
          id: '1',
          name: 'teste',
          email: user.email,
        });
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.register(user);
    });

    expect(services.auth.register).toBeCalledWith(user);
    expect(services.auth.login).toBeCalledWith({ email: user.email, password: user.password });
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.isAuthenticated).toBeTruthy();
  });

  it('Should failed register', async () => {
    const user = {
      name: 'Teste',
      email: 'teste@email.com',
      password: '12345678',
    };
    jest.spyOn(services.auth, 'register').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Register failed'));
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.register(user);
    });

    expect(services.auth.register).toBeCalled();
    expect(services.auth.register).rejects.toThrow();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.user).toBeNull();
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

  it('Should failed logout', async () => {
    jest.spyOn(services.auth, 'logout').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Logout failed'));
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.logout();
    });

    expect(services.auth.logout).toHaveBeenCalled();
    expect(services.auth.logout).rejects.toThrow();
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

  it('Should failed forgot password', async () => {
    const email = 'teste@email.com';
    jest.spyOn(services.auth, 'forgotPassword').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Forgot password failed'));
      });
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      result.current.forgotPassword(email);
    });

    expect(services.auth.forgotPassword).toBeCalled();
    expect(services.auth.forgotPassword).rejects.toThrow();
  });
});
