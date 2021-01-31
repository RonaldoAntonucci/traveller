import 'reflect-metadata';

import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import ListResponse from '@shared/core/ListResponse';
import InvalidParamsError from '@shared/errors/InvalidParamsErrors';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import FakeCategoriesRepository from '@modules/cities/repositories/fakes/FakeCategoriesRepository';
import Category from '@modules/cities/domain/Category';
import ListCategoriesService from '.';

describe('List Categories Service - unit', () => {
  let service: ListCategoriesService;
  let repo: ICategoriesRepository;

  let findAndCount: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCategoriesRepository();
    service = new ListCategoriesService(repo);

    findAndCount = jest.spyOn(repo, 'findAndCount');
  });

  it('Should be able to list Categories.', async () => {
    const params = new PaginationParams();

    findAndCount.mockImplementationOnce(() => new ListResponse<Category>());

    const categories = await service.execute(params);

    expect(categories instanceof ListResponse).toBe(true);
    expect(findAndCount).toBeCalledWith(params);
  });

  it('should not be able to list categories without valid params.', async () => {
    const params = { offset: 0, count: 20, order: 'DESC' as OrderType };

    await expect(service.execute(params)).rejects.toEqual(
      new InvalidParamsError(),
    );

    expect(findAndCount).not.toBeCalled();
  });
});
