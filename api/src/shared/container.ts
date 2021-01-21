import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IJwtProvider from '@modules/users/providers/JwtProvider/IJwtProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import BCryptHashProvider from './infra/providers/BCryptHashProvider';
import JsonWebTokenProvider from './infra/providers/JsonWebTokenProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IJwtProvider>('JwtProvider', JsonWebTokenProvider);
