import { render } from '@testing-library/react-native';
import { Spacer } from './Spacer';

describe('<Spacer />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Spacer />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
