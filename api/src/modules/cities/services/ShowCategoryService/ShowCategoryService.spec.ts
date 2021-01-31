import 'reflect-metadata';

import Category from '@modules/cities/domain/Category';
import { CategoryNotExistsError } from '@modules/cities/errors/service';
import FakeCategoriesRepository from '@modules/cities/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';

import ShowCategoryService from '.';

describe('ShowCategoryService - unit', () => {
  let service: ShowCategoryService;
  let repo: ICategoriesRepository;

  let checkCategory: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCategoriesRepository();
    service = new ShowCategoryService(repo);

    checkCategory = jest.spyOn(repo, 'findById');
  });

  it('should be able to show category.', async () => {
    const fakeId = 'fakeId';

    checkCategory.mockImplementationOnce(() => new Category());

    const category = await service.execute({ categoryId: fakeId });

    expect(category).toBeInstanceOf(Category);
    expect(checkCategory).toBeCalledWith(fakeId);
  });

  it('should not be able to show category if category not exists.', async () => {
    const fakeId = 'fakeId';

    checkCategory.mockImplementationOnce(() => undefined);

    await expect(service.execute({ categoryId: fakeId })).rejects.toEqual(
      new CategoryNotExistsError(fakeId),
    );

    expect(checkCategory).toBeCalledWith(fakeId);
  });
});
