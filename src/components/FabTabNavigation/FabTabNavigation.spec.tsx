import React from 'react';
import { render } from '@testing-library/react-native';
import { FabTabNavigation } from './FabTabNavigation';
import { wrapper } from '@app/utils/testUtils';

describe('<Fab />', () => {
  it('Should render correctly', () => {
    const tree = render(<FabTabNavigation />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
