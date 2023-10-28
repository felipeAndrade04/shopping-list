import { render } from '@testing-library/react-native';
import { Message } from './Message';
import { wrapper } from '@app/utils/testUtils';

const message = {
  title: 'Title teste',
  description: 'Description teste',
};

describe('<Message />', () => {
  it('Should be render correctly', () => {
    const tree = render(<Message title={message.title} description={message.description} />, {
      wrapper,
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should be render with image', () => {
    const { getByTestId, getByText } = render(
      <Message title={message.title} description={message.description} />,
      { wrapper }
    );

    expect(getByText(message.title)).toBeTruthy();
    expect(getByText(message.description)).toBeTruthy();
    expect(getByTestId('message-image')).toBeTruthy();
  });

  it('Should be render without image', () => {
    const { queryByTestId, getByText } = render(
      <Message showImage={false} title={message.title} description={message.description} />,
      { wrapper }
    );

    expect(getByText(message.title)).toBeTruthy();
    expect(getByText(message.description)).toBeTruthy();
    expect(queryByTestId('message-image')).toBeFalsy();
  });
});
