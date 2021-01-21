import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import { UserNotExistsError } from '@modules/users/errors/service';
import DeleteUserService from '.';

describe('DeleteUserService - unit', () => {
  let service: DeleteUserService;
  let repo: IUsersRepository;

  let deleteFunc: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    service = new DeleteUserService(repo);

    deleteFunc = jest.spyOn(repo, 'delete');
  });

  it('should be able to delete an User', async () => {
    const userId = 'fakeId';

    deleteFunc.mockImplementationOnce(() => 1);

    const result = await service.execute({ userId });

    expect(result).toBe(1);
    expect(deleteFunc).toBeCalledWith(userId);
  });

  it('should be return error if userId not exists.', async () => {
    const userId = 'fakeId';

    deleteFunc.mockImplementationOnce(() => null);

    await expect(service.execute({ userId })).rejects.toEqual(
      new UserNotExistsError(userId),
    );

    expect(deleteFunc).toBeCalledWith(userId);
  });
});
