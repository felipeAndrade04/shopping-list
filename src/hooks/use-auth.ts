import { auth } from '@app/config';
import services from '@app/services';
import { LoginParams, RegisterParams } from '@app/services/auth';
import { User, UserCredential, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserCredential | User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function register(data: RegisterParams) {
    try {
      setIsLoading(true);

      await services.auth.register(data);
    } catch (error) {
      const { message } = error as TypeError;
      console.tron.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function login(data: LoginParams) {
    try {
      setIsLoading(true);

      const response = await services.auth.login(data);

      setUser(response);
    } catch (error) {
      const { message } = error as TypeError;
      console.tron.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      setIsLoading(true);

      await services.auth.logout();

      setUser(null);
    } catch (error) {
      const { message } = error as TypeError;
      console.tron.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function forgotPassword(email: string) {
    try {
      setIsLoading(true);

      await services.auth.forgotPassword(email);
    } catch (error) {
      const { message } = error as TypeError;
      console.tron.log(message);
    } finally {
      setIsLoading(false);
    }
  }

  return {
    register,
    login,
    logout,
    forgotPassword,
    isLoading,
    user,
  };
}
