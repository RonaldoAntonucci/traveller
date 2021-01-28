import 'reflect-metadata';

import Category from '@modules/cities/domain/Category';
import FakeCategory from '@modules/cities/domain/fakes/FakeCategory';
import FakeCategoriesRepository from '@modules/cities/repositories/fakes/FakeCategoriesRepository';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import {
  MaxCategoriesError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import CreateCategoryService from '.';

describe('CreateCategoryService', () => {
  let service: CreateCategoryService;
  let repo: ICategoriesRepository;

  let checkName: jest.SpyInstance;
  let checkCount: jest.SpyInstance;
  let checkCreate: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCategoriesRepository();
    service = new CreateCategoryService(repo);

    checkName = jest.spyOn(repo, 'findByName');
    checkCount = jest.spyOn(repo, 'count');
    checkCreate = jest.spyOn(repo, 'create');
  });

  it('should be able to create a new Category', async () => {
    const categoryAttrs = FakeCategory();

    checkName.mockImplementationOnce(() => undefined);

    const category = await service.execute(categoryAttrs);

    expect(category).toBeInstanceOf(Category);
    expect(checkCount).toBeCalled();
    expect(checkName).toBeCalledWith(categoryAttrs.name);
    expect(checkCreate).toBeCalledWith({ name: categoryAttrs.name });
  });

  it('should not be able to create a new Category if name already exists.', async () => {
    const categoryAttrs = FakeCategory();

    checkName.mockImplementationOnce(() => new Category());

    await expect(service.execute(categoryAttrs)).rejects.toEqual(
      new NameAlreadyExistsError(categoryAttrs.name, 'category'),
    );

    expect(checkCount).toBeCalled();
    expect(checkName).toBeCalledWith(categoryAttrs.name);
    expect(checkCreate).not.toBeCalled();
  });

  it('should not be able to create a new Category if maximum categories reached.', async () => {
    const categoryAttrs = FakeCategory();

    checkCount.mockImplementationOnce(() => 3);

    await expect(service.execute(categoryAttrs)).rejects.toEqual(
      new MaxCategoriesError(3),
    );

    expect(checkCount).toBeCalled();
    expect(checkName).not.toBeCalled();
    expect(checkCreate).not.toBeCalled();
  });
});
