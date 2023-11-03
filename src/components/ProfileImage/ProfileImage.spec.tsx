import { render } from '@testing-library/react-native';
import { ProfileImage } from './ProfileImage';
import { wrapper } from '@app/utils/testUtils';

describe('<ProfileImage />', () => {
  const name = 'Felipe';
  const url = 'https://avatars.githubusercontent.com/u/42103489?v=4';

  it('Should be render correctly', () => {
    const tree = render(<ProfileImage name={name} />, { wrapper }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should be render profile with image', () => {
    const { getByTestId } = render(<ProfileImage name={name} url={url} />, { wrapper });

    expect(getByTestId('profile-image')).toBeTruthy();
  });

  it('Should be render profile without image', () => {
    const { getByTestId, getByText } = render(<ProfileImage name={name} />, { wrapper });

    expect(getByText(name[0])).toBeTruthy();
    expect(getByTestId('profile-without-image')).toBeTruthy();
  });
});
