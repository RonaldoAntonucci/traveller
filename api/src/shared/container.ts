import { container } from 'tsyringe';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import IJwtProvider from '@modules/users/providers/JwtProvider/IJwtProvider';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import CitiesRepository from '@modules/cities/infra/typeorm/repositories/CitiesRepository';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import CategoriesRepository from '@modules/cities/infra/typeorm/repositories/CategoriesRepository';
import BCryptHashProvider from './infra/providers/BCryptHashProvider';
import JsonWebTokenProvider from './infra/providers/JsonWebTokenProvider';
import DiskStorageProvider from './infra/providers/DiskStorageProvider';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IJwtProvider>('JwtProvider', JsonWebTokenProvider);

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);
