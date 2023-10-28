import { fireEvent, render, renderHook, waitFor } from '@testing-library/react-native';
import React from 'react';
import { Register } from './Register';
import { LoginParams, RegisterParams } from '@app/services/auth';
import services from '@app/services';
import { useAuth } from '@app/hooks';
import { resetStore, wrapper } from '@app/utils/testUtils';
import '@app/mocks/MockReactNativePlatform';

describe('Register page', () => {
  const navigation = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
    navigate: jest.fn(),
  };
  const route = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
  };

  afterEach(() => {
    jest.resetAllMocks();
    resetStore();
  });

  it('Should render correctly', () => {
    const tree = render(<Register navigation={navigation} route={route}></Register>, {
      wrapper,
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should be required name, email, password and confirm password', async () => {
    const { queryAllByText, queryByText } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );

    const button = queryByText(/criar conta/i);

    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(queryAllByText(/campo obrigatório/i)).toHaveLength(4);
  });

  it('Should be valid email', async () => {
    const { queryByText, queryByTestId } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );

    const button = queryByText(/criar conta/i);
    const inputEmail = queryByTestId(/input-email/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste');
      fireEvent.press(button);
    });

    expect(queryByText(/informe um email válido/i)).toBeTruthy();
  });

  it('Should be valid password', async () => {
    const { queryByText, queryByTestId } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );

    const button = queryByText(/criar conta/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputPassword, '1234');
      fireEvent.press(button);
    });

    expect(queryByText(/a senha precisa de 8 caracteres/i)).toBeTruthy();
  });

  it('Should be passwords match', async () => {
    const { queryByText, queryByTestId } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );

    const button = queryByText(/criar conta/i);
    const inputPassword = queryByTestId(/input-password/i);
    const inputConfirmPassword = queryByTestId(/input-confirm-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputPassword, '123456789');
      fireEvent.changeText(inputConfirmPassword, '12345678');
      fireEvent.press(button);
    });

    expect(queryByText(/as senhas não correspondem/i)).toBeTruthy();
  });

  it('Should be do register correctly', async () => {
    const user = {
      name: 'Teste',
      email: 'teste@email.com',
      password: '12345678',
    };
    const userId = '1';
    jest.spyOn(services.auth, 'register').mockImplementation((user: RegisterParams) => {
      return new Promise((resolve) => {
        resolve({
          id: userId,
          name: user.name,
          email: user.email,
        });
      });
    });
    jest.spyOn(services.auth, 'login').mockImplementation((loginUser: LoginParams) => {
      return new Promise((resolve) => {
        resolve({
          id: userId,
          name: user.name,
          email: loginUser.email,
        });
      });
    });
    const { queryByText, queryByTestId } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    const button = queryByText(/criar conta/i);
    const inputName = queryByTestId(/input-name/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);
    const inputConfirmPassword = queryByTestId(/input-confirm-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputName, user.name);
      fireEvent.changeText(inputEmail, user.email);
      fireEvent.changeText(inputPassword, user.password);
      fireEvent.changeText(inputConfirmPassword, user.password);
      fireEvent.press(button);
    });

    expect(services.auth.register).toBeCalledWith(user);
    expect(services.auth.login).toBeCalledWith({ email: user.email, password: user.password });
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.user.name).toBe(user.name);
    expect(result.current.user.id).toBe(userId);
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
    const { queryByText, queryByTestId } = render(
      <Register navigation={navigation} route={route}></Register>,
      {
        wrapper,
      }
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    const button = queryByText(/criar conta/i);
    const inputName = queryByTestId(/input-name/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);
    const inputConfirmPassword = queryByTestId(/input-confirm-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputName, user.name);
      fireEvent.changeText(inputEmail, user.email);
      fireEvent.changeText(inputPassword, user.password);
      fireEvent.changeText(inputConfirmPassword, user.password);
      fireEvent.press(button);
    });

    expect(services.auth.register).toBeCalled();
    expect(services.auth.register).rejects.toThrow();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.user).toBeNull();
  });

  it('Should navigate to login', () => {
    const { queryByTestId } = render(<Register navigation={navigation} route={route}></Register>, {
      wrapper,
    });

    const button = queryByTestId(/login/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});
