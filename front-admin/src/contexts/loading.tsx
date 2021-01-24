import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';

interface LoadingComponentProps {
  loading: boolean;
}

interface LoadingProviderProps {
  Component: React.FC<LoadingComponentProps>;
}

interface LoadingProviderData {
  loadingState: [number, Dispatch<SetStateAction<number>>];
}

const LoadingContext = createContext<LoadingProviderData>(
  {} as LoadingProviderData,
);

const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  Component,
}) => {
  const loadingState = useState(0);

  const [loading] = loadingState;

  return (
    <LoadingContext.Provider
      value={{
        loadingState,
      }}
    >
      <Component loading={!!loading} />
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
