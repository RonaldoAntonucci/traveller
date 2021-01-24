import { useContext, useCallback } from 'react';
import { v4 as uuid } from 'uuid';

import { ToastContext } from '../contexts/toast';
import ToastMessage from '../types/toastMessage';

interface UseToast {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const useToast = (): UseToast => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const [, setMessages] = context.messagesState;

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((prevState) => [...prevState, toast]);
    },
    [setMessages],
  );

  const removeToast = useCallback(
    (id: string) => {
      setMessages((prevState) =>
        prevState.filter((message) => message.id !== id),
      );
    },
    [setMessages],
  );

  return { addToast, removeToast };
};

export default useToast;
