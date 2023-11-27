import { auth } from '@app/config';
import services, { buildShoppingServices } from '@app/services';
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
import toast from '@app/utils/toast';

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

      buildShoppingServices(user.id);

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
      toast({ text: 'Usuário cadastrado com sucesso.', type: 'success' });

      await login({ email: data.email, password: data.password });
    } catch (error) {
      toast({ type: 'error', text: 'Algo deu errado ao tentar se cadastrar' });
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
      toast({ type: 'error', text: 'Email ou senha inválidos' });
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
      toast({ type: 'error', text: 'Algo deu errado ao tentar se sair' });
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function forgotPassword(email: string) {
    try {
      dispatch(updateLoading(true));

      await services.auth.forgotPassword(email);
      toast({ text: 'Solicitação de recuperação de senha efetuada com sucesso.', type: 'success' });
    } catch (error) {
      toast({ type: 'error', text: 'Algo deu errado ao tenta solicitar recuperação de senha' });
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
      const { message } = error as TypeError;
      throw new Error(message);
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function updatePassword(newPassword: string) {
    try {
      dispatch(updateLoading(true));

      await services.auth.updatePassword(newPassword);
    } catch (error) {
      const { message } = error as TypeError;
      throw new Error(message);
    } finally {
      dispatch(updateLoading(false));
    }
  }

  async function updateFullProfile(password: string, userInfo: UpdateProfileParams) {
    try {
      await updatePassword(password);
      await updateProfile(userInfo);
      toast({ text: 'Perfil atualizado com sucesso.', type: 'success' });
    } catch {
      toast({
        text: 'Algo deu errado ao tentar atualizar o perfil. Tente novamente.',
        type: 'error',
      });
    }
  }

  async function uploadProfileImage(url: string, name: string) {
    try {
      dispatch(updateLoading(true));
      return await services.storage.uploadFile(url, name);
    } catch {
      toast({
        text: 'Algo deu errado ao tentar atualizar o perfil. Tente novamente.',
        type: 'error',
      });
    } finally {
      dispatch(updateLoading(false));
    }
  }

  return {
    register,
    login,
    logout,
    forgotPassword,
    updateFullProfile,
    uploadProfileImage,
    isLoading: authState?.isLoading,
    user: authState?.user,
    isAuthenticated: authState?.isAuthenticated,
  };
}
