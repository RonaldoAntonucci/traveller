import 'reflect-metadata';

import FakeCategory from '@modules/cities/domain/fakes/FakeCategory';
import {
  CategoryNotExistsError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import FakeCategoriesRepository from '@modules/cities/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import Category from '@modules/cities/domain/Category';
import UpdateCategoryService from '.';

describe('Update Category Service - unit', () => {
  let service: UpdateCategoryService;
  let repo: ICategoriesRepository;

  let checkCategory: jest.SpyInstance;
  let checkName: jest.SpyInstance;
  let checkCategoryUpdate: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCategoriesRepository();
    service = new UpdateCategoryService(repo);

    checkCategory = jest.spyOn(repo, 'findById');
    checkName = jest.spyOn(repo, 'findByName');
    checkCategoryUpdate = jest.spyOn(repo, 'save');
  });

  it('should be able to update category(name, description).', async () => {
    const categoryAttrs = FakeCategory();
    const categoryId = 'fakeId';

    checkCategory.mockImplementationOnce(() => {
      const c = FakeCategory();
      return c;
    });
    checkName.mockImplementationOnce(() => undefined);

    const updatedCategory = await service.execute({
      categoryId,
      ...categoryAttrs,
    });

    expect(updatedCategory).toEqual(categoryAttrs);

    expect(checkCategory).toBeCalledWith(categoryId);
    expect(checkName).toBeCalledWith(categoryAttrs.name);
    expect(checkCategoryUpdate).toBeCalledWith(categoryAttrs);
  });

  it('should not be able to update category without valid CategoryId.', async () => {
    const categoryAttrs = FakeCategory();

    checkCategory.mockImplementationOnce(() => undefined);

    await expect(
      service.execute({ ...categoryAttrs, categoryId: 'fakeId' }),
    ).rejects.toEqual(new CategoryNotExistsError('fakeId'));

    expect(checkCategory).toBeCalledWith('fakeId');
    expect(checkName).not.toBeCalled();
    expect(checkCategoryUpdate).not.toBeCalled();
  });

  it('should not be able to change to another category name if new name is already in use.', async () => {
    const categoryAttrs = FakeCategory();
    categoryAttrs.id = 'fakeId';

    checkCategory.mockImplementationOnce(async () => new Category());
    checkName.mockImplementationOnce(async () => new Category());

    await expect(
      service.execute({
        ...categoryAttrs,
        categoryId: 'fakeId',
      }),
    ).rejects.toEqual(
      new NameAlreadyExistsError(categoryAttrs.name, 'category'),
    );

    expect(checkCategory).toBeCalledWith('fakeId');
    expect(checkName).toBeCalledWith(categoryAttrs.name);
    expect(checkCategoryUpdate).not.toBeCalled();
  });
});
