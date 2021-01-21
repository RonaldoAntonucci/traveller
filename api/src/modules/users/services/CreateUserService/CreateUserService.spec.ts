import 'reflect-metadata';

import FakeUser from '@modules/users/domain/fakes/FakeUser';
import User from '@modules/users/domain/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/FakeHashProvider';
import IHashProvider from '@modules/users/providers/HashProvider/IHashProvider';
import { EmailAlreadyExistsError } from '@modules/users/errors/service';
import CreateUserService from '.';

describe('Create User - unit', () => {
  let service: CreateUserService;
  let repo: IUsersRepository;
  let hashProvider: IHashProvider;

  let createUser: jest.SpyInstance;
  let emailInUse: jest.SpyInstance;
  let hashPassword: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    service = new CreateUserService(repo, hashProvider);

    createUser = jest.spyOn(repo, 'create');

    emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementation(async () => undefined);

    hashPassword = jest.spyOn(hashProvider, 'generateHash');
  });

  it('should be able to creata a new User', async () => {
    const userAttrs = FakeUser();

    const user = await service.execute(userAttrs);

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(hashPassword).toBeCalledWith(userAttrs.password);
    expect(createUser).toBeCalledWith(userAttrs);
    expect(user).toBeInstanceOf(User);
  });

  it('should be not able to create a new User if EMAIL already in use.', async () => {
    const userAttrs = FakeUser();

    emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementationOnce(async () => new User());

    await expect(service.execute(userAttrs)).rejects.toEqual(
      new EmailAlreadyExistsError(userAttrs.email),
    );

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(hashPassword).not.toBeCalled();
    expect(createUser).not.toBeCalled();
  });
});
