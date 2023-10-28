import { render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { ProductCard } from './ProductCard';
import { Product } from '@app/models';

const product: Product = {
  id: '1',
  name: 'Sabão',
  category: 'Limpeza',
  checked: true,
};

describe('<ProductCard />', () => {
  it('Should be render correctly', () => {
    const tree = render(<ProductCard isChecked={true} product={product} />, { wrapper }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should be render unchecked product', () => {
    const { queryByTestId, getByText } = render(
      <ProductCard isChecked={false} product={{ ...product, checked: false }} />,
      { wrapper }
    );

    expect(queryByTestId('checkbox-icon')).toBeFalsy();
    expect(getByText(product.name)).toBeTruthy();
    expect(queryByTestId('quantity')).toBeFalsy();
  });

  it('Should be render checked product', () => {
    const { queryByTestId, getByText } = render(
      <ProductCard isChecked={true} product={product} />,
      { wrapper }
    );

    expect(queryByTestId('checkbox-icon')).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(queryByTestId('quantity')).toBeTruthy();
  });

  it('Should be render simple card', () => {
    const { queryByTestId, getByText } = render(
      <ProductCard isChecked={true} isSimpleCard={true} product={product} />,
      { wrapper }
    );

    expect(queryByTestId('checkbox-icon')).toBeTruthy();
    expect(getByText(product.name)).toBeTruthy();
    expect(queryByTestId('quantity')).toBeFalsy();
  });
});
