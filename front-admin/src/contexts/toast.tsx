import React, { createContext, useState, SetStateAction } from 'react';

import ToastMessage from '../types/toastMessage';

type State<T> = [T, React.Dispatch<SetStateAction<T>>];

interface ToastContextData {
  messagesState: State<ToastMessage[]>;
}

interface ToastProviderProps {
  Component: React.FC<{ messages: ToastMessage[] }>;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  Component,
}) => {
  const messagesState = useState<ToastMessage[]>([]);

  const messages = messagesState[0];

  return (
    <ToastContext.Provider value={{ messagesState }}>
      {children}
      <Component messages={messages} />
    </ToastContext.Provider>
  );
};

export { ToastProvider, ToastContext };
