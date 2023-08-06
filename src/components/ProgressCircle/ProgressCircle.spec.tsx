import React from 'react';
import { render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle />', () => {
  it('Should render correctly', () => {
    const tree = render(<ProgressCircle progress={100} size={50} />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
