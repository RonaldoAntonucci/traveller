import { inject, injectable } from 'tsyringe';

import Category from '@modules/cities/domain/Category';
import ICreateCategoryDTO from '@modules/cities/dtos/ICreateCategoryDTO';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import IService from '@shared/core/IService';
import {
  NameAlreadyExistsError,
  MaxCategoriesError,
} from '@modules/cities/errors/service';

type Request = ICreateCategoryDTO;

type Response = Category;

@injectable()
export default class CreateCategoryService
  implements IService<Request, Response> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepo: ICategoriesRepository,
  ) {}

  public async execute({ name }: Request): Promise<Response> {
    const categoriesCount = await this.categoriesRepo.count();

    if (categoriesCount >= 3) {
      throw new MaxCategoriesError(3);
    }

    const nameExists = await this.categoriesRepo.findByName(name);

    if (nameExists) {
      throw new NameAlreadyExistsError(name, 'category');
    }

    const category = await this.categoriesRepo.create({ name });

    return category;
  }
}
