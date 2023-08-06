import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { Modal } from './Modal';

describe('<Modal />', () => {
  it('Should render correctly', () => {
    const tree = render(
      <Modal show={true} close={() => jest.fn}>
        <Text>Test</Text>
      </Modal>,
      { wrapper }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show content on screen', () => {
    const content = 'Modal Text';

    const { queryByText } = render(
      <Modal show={true} close={() => jest.fn}>
        <Text>{content}</Text>
      </Modal>,
      { wrapper }
    );

    expect(queryByText(content)).toBeTruthy();
  });

  it('Should not show content on screen', () => {
    const content = 'Modal Text';

    const { queryByText } = render(
      <Modal show={false} close={() => jest.fn}>
        <Text>{content}</Text>
      </Modal>,
      { wrapper }
    );

    expect(queryByText(content)).toBeFalsy();
  });

  it('Shold close modal', () => {
    const content = 'Modal Text';

    let show = true;

    const { queryByTestId } = render(
      <Modal show={show} close={() => (show = false)}>
        <Text>{content}</Text>
      </Modal>,
      { wrapper }
    );

    expect(show).toBeTruthy();

    const overlay = queryByTestId('overlay');
    fireEvent.press(overlay);

    expect(show).toBeFalsy();
  });

  it('Shold call close function', () => {
    const content = 'Modal Text';

    const close = jest.fn();

    const { queryByTestId } = render(
      <Modal show={true} close={close}>
        <Text>{content}</Text>
      </Modal>,
      { wrapper }
    );

    const overlay = queryByTestId('overlay');
    fireEvent.press(overlay);

    expect(close).toBeCalledTimes(1);
  });
});
