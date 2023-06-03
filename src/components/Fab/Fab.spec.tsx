import React from 'react';
import { render } from '@testing-library/react-native';
import { Fab } from './Fab';
import { wrapper } from '@app/utils';

describe('<Fab />', () => {
  it('Should render correctly', () => {
    const tree = render(<Fab />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
