import React from 'react';
import { render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { ShoppingList } from './ShoppingList';
import { mockedShopping } from '@app/mocks/mockShopping';

describe('<ShoppingList />', () => {
  it('Should render correctly', () => {
    const tree = render(<ShoppingList data={[mockedShopping]} />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
