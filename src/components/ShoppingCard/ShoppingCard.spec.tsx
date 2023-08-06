import React from 'react';
import { render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { ShoppingCard } from './ShoppingCard';
import { mockedShopping } from '@app/mocks/mockShopping';

describe('<ShoppingCard />', () => {
  it('Should render correctly', () => {
    const tree = render(<ShoppingCard shopping={mockedShopping} />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
