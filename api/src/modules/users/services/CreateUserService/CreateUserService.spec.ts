import 'reflect-metadata';

import FakeUser from '@modules/users/domain/fakes/FakeUser';
import User from '@modules/users/domain/User';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import CreateUserService from '.';

describe('Create User - unit', () => {
  let service: CreateUserService;
  let repo: IUsersRepository;

  let createUser: jest.SpyInstance;
  let emailInUse: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    service = new CreateUserService(repo);

    createUser = jest.spyOn(repo, 'create');

    emailInUse = jest
      .spyOn(repo, 'findByEmail')
      .mockImplementation(async () => undefined);
  });

  it('should be able to creata a new User', async () => {
    const userAttrs = FakeUser();

    const user = await service.execute(userAttrs);

    expect(emailInUse).toBeCalledWith(userAttrs.email);
    expect(createUser).toBeCalledWith(userAttrs);
    expect(user).toBeInstanceOf(User);
  });
});
