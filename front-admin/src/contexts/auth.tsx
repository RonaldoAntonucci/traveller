import React, { createContext, SetStateAction, useState } from 'react';
import JwtToken from '../types/jwtToken';
import User from '../types/user';

type State<T> = [T, React.Dispatch<SetStateAction<T>>];

interface AuthContextData {
  tokenState: State<JwtToken | null>;
  userState: State<User | null>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const tokenState = useState<JwtToken | null>(null);
  const userState = useState<User | null>(null);

  return (
    <AuthContext.Provider value={{ tokenState, userState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
