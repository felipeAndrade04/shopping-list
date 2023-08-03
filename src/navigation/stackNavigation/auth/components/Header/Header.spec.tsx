import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { wrapper } from '@app/utils';
import { Header } from './Header';
import { MockSafeAreaContext } from '@app/mocks';

describe('<Header />', () => {
  jest.mock('react-native-safe-area-context', () => MockSafeAreaContext);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('Should render correctly', () => {
    const onPress = jest.fn();
    const tree = render(<Header onPress={onPress} />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should make have go back', () => {
    const onPress = jest.fn();
    const { queryByTestId } = render(<Header onPress={onPress} />, {
      wrapper,
    });

    const button = queryByTestId('go-back');
    fireEvent.press(button);

    expect(onPress).toBeCalledTimes(1);
  });
});
