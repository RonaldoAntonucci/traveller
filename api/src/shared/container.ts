import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { container } from 'tsyringe';
import BCryptHashProvider from './infra/providers/BCryptHashProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
