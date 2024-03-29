import React, { fireEvent, render } from '@testing-library/react-native';
import { Welcome } from '../Welcome';
import { wrapper } from '@app/utils/testUtils';

describe('Welcome page', () => {
  const navigation = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
    navigate: jest.fn(),
  };
  const route = {
    ...jest.requireMock('@app/navigation/stackNavigation/auth'),
  };

  it('Should render correctly', () => {
    const tree = render(<Welcome navigation={navigation} route={route}></Welcome>, {
      wrapper,
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should navigate to login page', () => {
    const { queryByText } = render(<Welcome navigation={navigation} route={route}></Welcome>, {
      wrapper,
    });

    const button = queryByText(/entrar/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('Should navigate to register', () => {
    const { queryByText } = render(<Welcome navigation={navigation} route={route}></Welcome>, {
      wrapper,
    });

    const button = queryByText(/criar uma conta/i);
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});
