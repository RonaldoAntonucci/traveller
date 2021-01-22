import storeKey from '../constants/storeKey';
import User from '../types/user';
import Token from '../types/jwtToken';

interface LoginDTO {
  token: Token;
  user: User;
}

export const getToken = (): Token | null =>
  localStorage.getItem(`${storeKey}:token`);

export const getUser = (): User | null => {
  const user = localStorage.getItem(`${storeKey}:user`);

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean =>
  localStorage.getItem(`${storeKey}:token`) !== null &&
  localStorage.getItem(`${storeKey}:user`) !== null;

export const login = ({ token, user }: LoginDTO): void => {
  localStorage.setItem(`${storeKey}:token`, token);
  localStorage.setItem(`${storeKey}:user`, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(`${storeKey}:token`);
  localStorage.removeItem(`${storeKey}:user`);
};
