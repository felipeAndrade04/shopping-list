import { fireEvent, render } from '@testing-library/react-native';
import { Quantity } from './Quantity';
import { wrapper } from '@app/utils/testUtils';

describe('<Quantity />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Quantity />, { wrapper }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should show default quantity', () => {
    const { getByText } = render(<Quantity />, { wrapper });

    expect(getByText('1')).toBeTruthy();
  });

  it('Should show initial quantity', () => {
    const { getByText } = render(<Quantity initialValue={2} />, { wrapper });

    expect(getByText('2')).toBeTruthy();
  });

  it('Should increment quantity', () => {
    let quantity = 1;
    const { getByText, getByTestId } = render(
      <Quantity onChange={(newQuantity) => (quantity = newQuantity)} initialValue={quantity} />,
      { wrapper }
    );

    expect(getByText('1')).toBeTruthy();
    expect(quantity).toEqual(1);

    const button = getByTestId('increment-quantity');
    fireEvent.press(button);

    expect(getByText('2')).toBeTruthy();
    expect(quantity).toEqual(2);
  });

  it('Should decrement quantity', () => {
    let quantity = 2;
    const { getByText, getByTestId } = render(
      <Quantity onChange={(newQuantity) => (quantity = newQuantity)} initialValue={quantity} />,
      { wrapper }
    );

    expect(getByText('2')).toBeTruthy();
    expect(quantity).toEqual(2);

    const button = getByTestId('decrement-quantity');
    fireEvent.press(button);

    expect(getByText('1')).toBeTruthy();
    expect(quantity).toEqual(1);
  });
});
