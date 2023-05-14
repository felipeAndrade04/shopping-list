import React, { ReactNode } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Input } from './Input';
import { ThemeProvider } from 'styled-components/native';
import * as theme from '@app/theme';

describe('<Input />', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

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
});
