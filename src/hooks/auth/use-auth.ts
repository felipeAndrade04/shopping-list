import { auth } from '@app/config';
import services from '@app/services';
import { LoginParams, RegisterParams, UpdateProfileParams } from '@app/services/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppSelector } from '../use-app-selector';
import {
  selectAuth,
  updateLoading,
  login as loginStore,
  logout as logoutStore,
  updateProfile as updateProfileStore,
} from '@app/store';
import { useAppDispatch } from '../use-app-dispatch';
import { User } from '@app/models';

export function useAuth() {
  const authState = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        return;
      }

      const user: User = {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        id: firebaseUser.uid,
        imageUrl: firebaseUser.photoURL,
      };

      dispatch(loginStore(user));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function register(data: RegisterParams) {
    try {
      dispatch(updateLoading(true));

      await services.auth.register(data);

      await login({ email: data.email, password: data.password });
    } catch (error) {
      // const { _message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function login(data: LoginParams) {
    try {
      dispatch(updateLoading(true));

      const response = await services.auth.login(data);

      dispatch(loginStore(response));
    } catch (error) {
      // const { _message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function logout() {
    try {
      dispatch(updateLoading(true));

      await services.auth.logout();

      dispatch(logoutStore());
    } catch (error) {
      // const { message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function forgotPassword(email: string) {
    try {
      dispatch(updateLoading(true));

      await services.auth.forgotPassword(email);
    } catch (error) {
      // const { message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function updateProfile(data: UpdateProfileParams) {
    if (authState.user.name === data.name && authState.user.imageUrl === data.imageUrl) {
      return;
    }

    try {
      dispatch(updateLoading(true));

      await services.auth.updateProfile(data);
      dispatch(updateProfileStore(data));
    } catch (error) {
      // const { message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      dispatch(updateLoading(true));

      await services.auth.updatePassword(newPassword);
    } catch (error) {
      // const { message } = error as TypeError;
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function updateFullProfile(password: string, userInfo: UpdateProfileParams) {
    await updatePassword(password);
    await updateProfile(userInfo);
  }

  return {
    register,
    login,
    logout,
    forgotPassword,
    updateFullProfile,
    isLoading: authState?.isLoading,
    user: authState?.user,
    isAuthenticated: authState?.isAuthenticated,
  };
}
