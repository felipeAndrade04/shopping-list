import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Input } from './Input';
import { wrapper } from '@app/utils/testUtils';
import { View } from 'react-native';

describe('<Input />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Input />, { wrapper }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should change text', () => {
    let value = '';
    const onChangeText = (text: string) => (value = text);
    const { getByTestId } = render(<Input value={value} onChangeText={onChangeText} />, {
      wrapper,
    });

    const input = getByTestId('input');
    fireEvent.changeText(input, 'test');

    expect(value).toBe('test');
  });

  it('should show error message', () => {
    const { getByText } = render(<Input error="test error" />, {
      wrapper,
    });

    const textError = getByText('test error');

    expect(textError).toBeTruthy();
  });

  it('Should render left Icon', () => {
    const { getByTestId } = render(<Input leftIcon={<View testID="leftIcon" />} />, { wrapper });

    expect(getByTestId('leftIcon')).toBeTruthy();
  });

  it('Should render right Icon', () => {
    const { getByTestId } = render(<Input rightIcon={<View testID="rightIcon" />} />, { wrapper });

    expect(getByTestId('rightIcon')).toBeTruthy();
  });
});
