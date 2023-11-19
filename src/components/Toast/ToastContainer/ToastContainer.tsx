import { useEffect, useState } from 'react';
import { ToastMessage } from '../ToastMessage';
import * as S from './ToastContainer.styles';
import { Dimensions } from 'react-native';
import { Toast, toastEventManager } from '@app/utils/toast';

export function ToastContainer() {
  const [messages, setMessages] = useState<Toast[]>([]);
  const { width } = Dimensions.get('window');

  useEffect(() => {
    function handleAddToast({ type, text, duration, id }: Toast) {
      setMessages((prevState) => [
        ...prevState,
        {
          id,
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.addListener('addtoast', handleAddToast);

    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, [setMessages]);

  function handleRemoveMessage(id: string) {
    setMessages((prevState) => prevState.filter((message) => message.id !== id));
  }

  return (
    <S.Container width={width - 48}>
      {messages.map((message) => (
        <ToastMessage key={message.id} message={message} onRemoveMessage={handleRemoveMessage} />
      ))}
    </S.Container>
  );
}
