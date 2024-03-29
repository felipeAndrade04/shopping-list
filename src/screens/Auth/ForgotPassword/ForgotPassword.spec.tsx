import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import { ForgotPassword } from './ForgotPassword';
import services from '@app/services';
import { wrapper } from '@app/utils/testUtils';

describe('Forgot password page', () => {
  const navigation = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
    navigate: jest.fn(),
  };
  const route = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
  };

  it('Should render correctly', () => {
    const tree = render(<ForgotPassword navigation={navigation} route={route}></ForgotPassword>, {
      wrapper,
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should be required email', async () => {
    const { queryByText } = render(
      <ForgotPassword navigation={navigation} route={route}></ForgotPassword>,
      {
        wrapper,
      }
    );

    const button = queryByText(/enviar/i);

    await waitFor(() => {
      fireEvent.press(button);
    });

    expect(queryByText(/campo obrigatório/i)).toBeTruthy();
  });

  it('Should be valid email', async () => {
    const { queryByText, queryByTestId } = render(
      <ForgotPassword navigation={navigation} route={route}></ForgotPassword>,
      {
        wrapper,
      }
    );

    const button = queryByText(/enviar/i);
    const inputEmail = queryByTestId(/input-email/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, 'teste');
      fireEvent.press(button);
    });

    expect(queryByText(/informe um email válido/i)).toBeTruthy();
  });

  it('Should be do forgot password correctly', async () => {
    const email = 'teste@email.com';
    jest.spyOn(services.auth, 'forgotPassword').mockImplementation(() => {
      return new Promise((resolve) => {
        resolve();
      });
    });
    const { queryByText, queryByTestId } = render(
      <ForgotPassword navigation={navigation} route={route}></ForgotPassword>,
      {
        wrapper,
      }
    );

    const button = queryByText(/enviar/i);
    const inputEmail = queryByTestId(/input-email/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, email);
      fireEvent.press(button);
    });

    expect(services.auth.forgotPassword).toBeCalledWith(email);
    expect(navigation.navigate).toBeCalledWith('Login');
  });

  it('Should failed forgot password', async () => {
    const email = 'teste@email.com';
    jest.spyOn(services.auth, 'forgotPassword').mockImplementation(() => {
      return new Promise((_resolve, reject) => {
        return reject(new Error('Forgot password failed'));
      });
    });
    const { queryByText, queryByTestId } = render(
      <ForgotPassword navigation={navigation} route={route}></ForgotPassword>,
      {
        wrapper,
      }
    );

    const button = queryByText(/enviar/i);
    const inputEmail = queryByTestId(/input-email/i);

    await waitFor(() => {
      fireEvent.changeText(inputEmail, email);
      fireEvent.press(button);
    });

    expect(services.auth.forgotPassword).toBeCalled();
    expect(services.auth.forgotPassword).rejects.toThrow();
  });
});
