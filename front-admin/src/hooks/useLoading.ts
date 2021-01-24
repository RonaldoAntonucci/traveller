import {
  Dispatch,
  SetStateAction,
  useContext,
  useCallback,
  useMemo,
} from 'react';

import { LoadingContext } from '../contexts/loading';

interface useLoadingData {
  setLoading: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
}

const useLoading = (): useLoadingData => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error('useLoading must be used within an LoadingProvider.');
  }

  const [loadingStateValue, setLoadingState] = loadingContext.loadingState;

  const loading = useMemo(() => !!loadingStateValue, [loadingStateValue]);

  const setLoading = useCallback(
    (loadingValue) => {
      setLoadingState((prevValue: number) => {
        if (loadingValue) {
          return prevValue + 1;
        }
        return prevValue - 1 < 0 ? 0 : prevValue - 1;
      });
    },
    [setLoadingState],
  );

  return { loading, setLoading };
};

export default useLoading;
