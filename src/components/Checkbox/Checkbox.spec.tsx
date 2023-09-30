import { fireEvent, render } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';
import { wrapper } from '@app/utils/testUtils';

describe('<Checkbox />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Checkbox />, { wrapper }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should toggle checkbox', () => {
    let value = true;

    const { getByTestId } = render(<Checkbox value={value} onChange={() => (value = !value)} />, {
      wrapper,
    });

    expect(value).toBeTruthy();

    const checkbox = getByTestId('checkbox');
    fireEvent.press(checkbox);

    expect(value).toBeFalsy();
  });
});
