import { fireEvent, render } from '@testing-library/react-native';
import { Checkbox } from './Checkbox';
import { wrapper } from '@app/utils/testUtils';

describe('<Checkbox />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Checkbox />, { wrapper }).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should be render checked checkbox', () => {
    const { getByTestId } = render(<Checkbox value={true} />, { wrapper });

    expect(getByTestId('checkbox-icon')).toBeTruthy();
  });

  it('Should be render unchecked checkbox', () => {
    const { queryByTestId } = render(<Checkbox value={false} />, { wrapper });

    expect(queryByTestId('checkbox-icon')).toBeFalsy();
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
