import { useCallback, useContext } from 'react';
import { MenuContext } from '../contexts/menu';

interface UseMenu {
  disableMenu(): void;
  enableMenu(): void;
}

const useMenu = (): UseMenu => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('useMenu must be used within an MenuProvider.');
  }

  const [, setDisable] = context.disableState;

  const disableMenu = useCallback(() => setDisable(true), [setDisable]);

  const enableMenu = useCallback(() => setDisable(false), [setDisable]);

  return { disableMenu, enableMenu };
};

export default useMenu;
