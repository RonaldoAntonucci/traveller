import storeKey from '../constants/storeKey';
import User from '../types/user';
import Token from '../types/jwtToken';

interface LoginDTO {
  token: Token;
  user: User;
}

export const getToken = (): Token | null => {
  const token = localStorage.getItem(`${storeKey}:token`);
  if (token) {
    return token;
  }
  return sessionStorage.getItem(`${storeKey}:token`);
};

export const getUser = (): User | null => {
  let user = localStorage.getItem(`${storeKey}:user`);

  if (!user) {
    user = sessionStorage.getItem(`${storeKey}:user`);
  }

  return user ? JSON.parse(user) : null;
};

export const login = ({ token, user }: LoginDTO): void => {
  localStorage.setItem(`${storeKey}:token`, token);
  localStorage.setItem(`${storeKey}:user`, JSON.stringify(user));
};

export const SessionLogin = ({ token, user }: LoginDTO): void => {
  sessionStorage.setItem(`${storeKey}:token`, token);
  sessionStorage.setItem(`${storeKey}:user`, JSON.stringify(user));
};

export const logout = (): void => {
  localStorage.removeItem(`${storeKey}:token`);
  localStorage.removeItem(`${storeKey}:user`);
  sessionStorage.removeItem(`${storeKey}:token`);
  sessionStorage.removeItem(`${storeKey}:user`);
};
