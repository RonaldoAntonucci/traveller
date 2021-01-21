import 'reflect-metadata';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import ListResponse from '@shared/core/ListResponse';
import User from '@modules/users/domain/User';
import ListUsersService from '.';
import { InvalidParamsError } from './ListUsersErrors';

describe('List Users Service - unit', () => {
  let service: ListUsersService;
  let repo: IUsersRepository;

  let findAndCount: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeUsersRepository();
    service = new ListUsersService(repo);

    findAndCount = jest.spyOn(repo, 'findAndCount');
  });

  it('Should be able to list Users.', async () => {
    const params = new PaginationParams();

    findAndCount.mockImplementationOnce(() => new ListResponse<User>());

    const users = await service.execute(params);

    expect(users instanceof ListResponse).toBe(true);
    expect(findAndCount).toBeCalledWith(params);
  });

  it('should not be able to list users without valid params.', async () => {
    const params = { offset: 0, count: 20, order: 'DESC' as OrderType };

    await expect(service.execute(params)).rejects.toEqual(
      new InvalidParamsError(),
    );

    expect(findAndCount).not.toBeCalled();
  });
});
