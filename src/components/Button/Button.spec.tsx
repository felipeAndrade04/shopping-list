import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Button } from './Button';

describe('<Button />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Button>Teste</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should be render variant outline correctly', () => {
    const tree = render(<Button variant="outline">Teste</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should have called the function', () => {
    const mockFn = jest.fn();

    render(<Button onPress={mockFn}>Teste</Button>);

    const button = screen.getByText('Teste');
    fireEvent.press(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('Should show the loading', () => {
    const buttonText = 'Teste';
    const { queryByTestId, queryByText } = render(<Button isLoading={true}>{buttonText}</Button>);

    const activityIndicator = queryByTestId('button-loading');
    const button = queryByText(buttonText);

    expect(activityIndicator).toBeTruthy();
    expect(button).toBeFalsy();
  });
});
