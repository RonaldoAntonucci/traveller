import { useCallback, useContext, useMemo } from 'react';
import { AuthContext } from '../contexts/auth';
import UsersRepository from '../repositories/UsersRepository';
import User from '../types/user';
import { login, logout, SessionLogin } from '../store/auth';

interface SignInDTO {
  email: string;
  password: string;
  remember: boolean;
}

interface UseAuth {
  signIn(data: SignInDTO): Promise<void>;
  signOut(): void;
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const useAuth = (): UseAuth => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  const {
    tokenState: [token, setToken],
    userState: [user, setUser],
  } = authContext;

  const isAuthenticated = useMemo(() => !!token && !!user, [token, user]);

  const signIn = useCallback(
    async ({ email, password, remember }: SignInDTO) => {
      return UsersRepository.signIn({ email, password }).then((data) => {
        setToken(data.token);
        setUser(data.user);

        if (remember) {
          login({ user: data.user, token: data.token });
        } else {
          SessionLogin({ user: data.user, token: data.token });
        }
      });
    },
    [setToken, setUser],
  );

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);

    logout();
  }, [setToken, setUser]);

  return { signIn, user, token, signOut, isAuthenticated };
};

export default useAuth;
