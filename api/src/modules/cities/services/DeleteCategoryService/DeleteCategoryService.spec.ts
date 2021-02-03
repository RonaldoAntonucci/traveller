import 'reflect-metadata';

import FakeCategoriesRepository from '@modules/cities/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';

import { CategoryNotExistsError } from '@modules/cities/errors/service';
import FakeCategory from '@modules/cities/domain/fakes/FakeCategory';
import DeleteCategoryService from '.';

describe('DeleteCategoryService - unit', () => {
  let service: DeleteCategoryService;
  let repo: ICategoriesRepository;

  let deleteFunc: jest.SpyInstance;
  let checkCategory: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCategoriesRepository();
    service = new DeleteCategoryService(repo);

    deleteFunc = jest.spyOn(repo, 'delete');
    checkCategory = jest.spyOn(repo, 'findById');
  });

  it('should be able to delete an Category', async () => {
    const categoryId = 'fakeId';

    const category = FakeCategory();

    checkCategory.mockImplementationOnce(() => category);
    deleteFunc.mockImplementationOnce(() => 1);

    const result = await service.execute({ categoryId });

    expect(result).toBe(1);
    expect(deleteFunc).toBeCalledWith(categoryId);
    expect(checkCategory).toBeCalledWith(categoryId);
  });

  it('should be return error if categoryId not exists.', async () => {
    const categoryId = 'fakeId';

    checkCategory.mockImplementationOnce(() => undefined);

    await expect(service.execute({ categoryId })).rejects.toEqual(
      new CategoryNotExistsError(categoryId),
    );

    expect(deleteFunc).not.toBeCalled();
    expect(checkCategory).toBeCalledWith(categoryId);
  });
});
