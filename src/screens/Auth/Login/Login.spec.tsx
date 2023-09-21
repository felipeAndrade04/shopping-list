import React from 'react';
import { fireEvent, render, renderHook, waitFor } from '@testing-library/react-native';
import { Login } from './Login';
import { AuthStackNavigationProps } from '@app/navigation/stackNavigation/auth';
import services from '@app/services';
import { LoginParams } from '@app/services/auth';
import { useAuth } from '@app/hooks';
import { resetStore, wrapper } from '@app/utils/testUtils';
import '@app/mocks/MockReactNativePlatform';

describe('Login page', () => {
  const navigation = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
    navigate: jest.fn(),
  } as AuthStackNavigationProps;

  afterEach(() => {
    jest.resetAllMocks();
    resetStore();
  });

  it('Should render correctly', () => {
    const tree = render(<Login navigation={navigation}></Login>, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should be required email and password', async () => {
    const { queryAllByText, queryByText } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);

    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(queryAllByText(/campo obrigatório/i)).toHaveLength(2);
  });

  it('Should be required email', async () => {
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputPassword, '12345678');
      fireEvent.press(button);
    });

    expect(queryByText(/campo obrigatório/i)).toBeTruthy();
  });

  it('Should be required password', async () => {
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste@email.com');
      fireEvent.press(button);
    });

    expect(queryByText(/campo obrigatório/i)).toBeTruthy();
  });

  it('Should be valid email and password', async () => {
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste');
      fireEvent.changeText(inputPassword, '1234');
      fireEvent.press(button);
    });

    expect(queryByText(/informe um email válido/i)).toBeTruthy();
    expect(queryByText(/a senha precisa de 8 caracteres/i)).toBeTruthy();
  });

  it('Should be valid email', async () => {
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste');
      fireEvent.changeText(inputPassword, '12345678');
      fireEvent.press(button);
    });

    expect(queryByText(/informe um email válido/i)).toBeTruthy();
  });

  it('Should be valid password', async () => {
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste@email.com');
      fireEvent.changeText(inputPassword, '1234');
      fireEvent.press(button);
    });

    expect(queryByText(/a senha precisa de 8 caracteres/i)).toBeTruthy();
  });

  it('Should be do login correctly', async () => {
    const user = {
      email: 'teste@email.com',
      password: '12345678',
    };
    const userName = 'teste';
    const userId = '1';
    jest.spyOn(services.auth, 'login').mockImplementation((user: LoginParams) => {
      return new Promise((resolve) => {
        resolve({
          id: userId,
          name: userName,
          email: user.email,
        });
      });
    });
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, user.email);
      fireEvent.changeText(inputPassword, user.password);
      fireEvent.press(button);
    });

    expect(services.auth.login).toBeCalledWith(user);
    expect(result.current.user.email).toBe(user.email);
    expect(result.current.user.name).toBe(userName);
    expect(result.current.user.id).toBe(userId);
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
    const { queryByText, queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });
    const { result } = renderHook(() => useAuth(), { wrapper });

    const button = queryByText(/entrar/i);
    const inputEmail = queryByTestId(/input-email/i);
    const inputPassword = queryByTestId(/input-password/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, user.email);
      fireEvent.changeText(inputPassword, user.password);
      fireEvent.press(button);
    });

    expect(services.auth.login).toBeCalled();
    expect(services.auth.login).rejects.toThrow();
    expect(result.current.isAuthenticated).toBeFalsy();
    expect(result.current.user).toBeNull();
  });

  it('Should navigate to forgot password page', () => {
    const { queryByText } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByText(/recuperar senha/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
  });

  it('Should navigate to register', () => {
    const { queryByTestId } = render(<Login navigation={navigation}></Login>, {
      wrapper,
    });

    const button = queryByTestId(/register/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});
