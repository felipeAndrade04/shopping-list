import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { wrapper } from '@app/utils/testUtils';
import { ActionModal } from './ActionModal';

describe('<ActionModal />', () => {
  const handleSuccess = jest.fn(() => Promise.resolve());
  const title = 'Modal Text';

  it('Should render correctly', () => {
    const tree = render(
      <ActionModal
        show={true}
        close={jest.fn}
        successAction={handleSuccess}
        title="Modal Test"
        successActionText="Test"
      />,
      {
        wrapper,
      }
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Should show content on screen', () => {
    const { queryByText } = render(
      <ActionModal
        show={true}
        close={jest.fn}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    expect(queryByText(title)).toBeTruthy();
  });

  it('Shold close modal on overlay click', () => {
    let show = true;

    const { queryByTestId } = render(
      <ActionModal
        show={show}
        close={() => (show = false)}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    expect(show).toBeTruthy();

    const overlay = queryByTestId('overlay');
    fireEvent.press(overlay);

    expect(show).toBeFalsy();
  });

  it('Shold close modal on cancel button click', () => {
    let show = true;

    const { queryByTestId } = render(
      <ActionModal
        show={show}
        close={() => (show = false)}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    expect(show).toBeTruthy();

    const cancelButton = queryByTestId('cancelButton');
    fireEvent.press(cancelButton);

    expect(show).toBeFalsy();
  });

  it('Shold call close function on overlay click', () => {
    const close = jest.fn();

    const { queryByTestId } = render(
      <ActionModal
        show={true}
        close={close}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    const overlay = queryByTestId('overlay');
    fireEvent.press(overlay);

    expect(close).toBeCalledTimes(1);
  });

  it('Shold call close function on cancel button click', () => {
    const close = jest.fn();

    const { queryByTestId } = render(
      <ActionModal
        show={true}
        close={close}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    const cancelButton = queryByTestId('cancelButton');
    fireEvent.press(cancelButton);

    expect(close).toBeCalledTimes(1);
  });

  it('Shold call success function', () => {
    const { queryByTestId } = render(
      <ActionModal
        show={true}
        close={jest.fn}
        successAction={handleSuccess}
        title={title}
        successActionText="Test"
      />,
      { wrapper }
    );

    const successButton = queryByTestId('successButton');
    fireEvent.press(successButton);

    expect(handleSuccess).toBeCalledTimes(1);
  });
});
