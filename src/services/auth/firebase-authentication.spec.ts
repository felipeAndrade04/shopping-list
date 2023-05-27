import * as FirebaseAuth from 'firebase/auth';
import services from '..';
import { LoginParams, RegisterParams } from './auth.types';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  getAuth: jest.fn(),
}));

describe('Authentication', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should do login correctly', async () => {
    const user = {
      email: 'test@gmail.com',
      password: '12345678',
    };
    const userID = '1';
    const userName = 'Test';

    jest.spyOn(FirebaseAuth, 'signInWithEmailAndPassword').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          user: {
            uid: userID,
            email: user.email,
            displayName: userName,
          },
        } as FirebaseAuth.UserCredential);
      });
    });

    const response = await services.auth.login(user);

    expect(FirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalled();
    expect(response).toMatchObject({ id: userID, name: userName, email: user.email });
  });

  it('should failled login', async () => {
    jest.spyOn(FirebaseAuth, 'signInWithEmailAndPassword').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Login failed'));
      });
    });

    try {
      await services.auth.login({} as LoginParams);
    } catch (e) {
      if (e instanceof Error) {
        expect(FirebaseAuth.signInWithEmailAndPassword).toHaveBeenCalled();
        expect(e.message).toBe('Login failed');
        expect(services.auth.login).rejects.toThrow();
      }
    }
  });

  it('should do register correctly', async () => {
    const user = {
      name: 'Teste',
      email: 'test@gmail.com',
      password: '12345678',
    };
    const userID = '1';

    jest.spyOn(FirebaseAuth, 'createUserWithEmailAndPassword').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve({
          user: {
            uid: userID,
            email: user.email,
            displayName: user.name,
          },
        } as FirebaseAuth.UserCredential);
      });
    });
    jest.spyOn(FirebaseAuth, 'updateProfile').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });

    const response = await services.auth.register(user);

    expect(FirebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(FirebaseAuth.updateProfile).toHaveBeenCalled();
    expect(response).toMatchObject({ id: userID, name: user.name, email: user.email });
  });

  it('should failled register', async () => {
    jest.spyOn(FirebaseAuth, 'createUserWithEmailAndPassword').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Register failed'));
      });
    });

    try {
      await services.auth.register({} as RegisterParams);
    } catch (e) {
      if (e instanceof Error) {
        expect(FirebaseAuth.createUserWithEmailAndPassword).toHaveBeenCalled();
        expect(e.message).toBe('Register failed');
        expect(services.auth.register).rejects.toThrow();
      }
    }
  });

  it('should do logout correctly', async () => {
    jest.spyOn(FirebaseAuth, 'signOut').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });

    await services.auth.logout();

    expect(FirebaseAuth.signOut).toHaveBeenCalled();
  });

  it('should failled logout', async () => {
    jest.spyOn(FirebaseAuth, 'signOut').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Logout failed'));
      });
    });

    try {
      await services.auth.logout();
    } catch (e) {
      if (e instanceof Error) {
        expect(FirebaseAuth.signOut).toHaveBeenCalled();
        expect(e.message).toBe('Logout failed');
        expect(services.auth.logout).rejects.toThrow();
      }
    }
  });

  it('should do forgot password correctly', async () => {
    const email = 'teste@email.com';
    jest.spyOn(FirebaseAuth, 'sendPasswordResetEmail').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });

    await services.auth.forgotPassword(email);

    expect(FirebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith(undefined, email);
  });

  it('should failled forgot password', async () => {
    const email = 'teste@email.com';
    jest.spyOn(FirebaseAuth, 'sendPasswordResetEmail').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Forgot password failed'));
      });
    });

    try {
      await services.auth.forgotPassword(email);
    } catch (e) {
      if (e instanceof Error) {
        expect(FirebaseAuth.sendPasswordResetEmail).toHaveBeenCalledWith(undefined, email);
        expect(e.message).toBe('Forgot password failed');
        expect(services.auth.forgotPassword).rejects.toThrow();
      }
    }
  });
});
