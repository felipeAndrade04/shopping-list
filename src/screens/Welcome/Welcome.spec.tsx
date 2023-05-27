import React, { fireEvent, render } from '@testing-library/react-native';
import { Welcome } from '../Welcome';
import { AuthStackNavigationProps } from '@app/navigation/stackNavigation/auth';
import { wrapper } from '@app/utils';

describe('Welcome page', () => {
  const navigation = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
    navigate: jest.fn(),
  } as AuthStackNavigationProps;

  it('Should render correctly', () => {
    const tree = render(<Welcome navigation={navigation}></Welcome>, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should navigate to login page', () => {
    const { queryByText } = render(<Welcome navigation={navigation}></Welcome>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('Should navigate to register', () => {
    const { queryByText } = render(<Welcome navigation={navigation}></Welcome>, {
      wrapper,
    });

    const button = queryByText(/criar uma conta/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});
