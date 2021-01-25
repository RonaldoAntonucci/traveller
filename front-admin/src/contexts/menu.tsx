import React, { createContext, SetStateAction, useState } from 'react';

type State<T> = [T, React.Dispatch<SetStateAction<T>>];

interface MenuContextData {
  disableState: State<boolean>;
}

interface ToastProviderProps {
  Component: React.FC;
}

const MenuContext = createContext<MenuContextData>({} as MenuContextData);

const MenuProvider: React.FC<ToastProviderProps> = ({
  children,
  Component,
}) => {
  const disableState = useState(false);
  const [disable] = disableState;

  return (
    <MenuContext.Provider value={{ disableState }}>
      {!disable && <Component />}
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuProvider };
