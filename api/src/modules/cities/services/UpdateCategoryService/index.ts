import Category from '@modules/cities/domain/Category';
import IUpdateCategoryDTO from '@modules/cities/dtos/IUpdateCategoryDTO';
import {
  CategoryNotExistsError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IUpdateCategoryDTO;
type Response = Category;

@injectable()
export default class UpdateCategoryService
  implements IService<Request, Response> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ categoryId, name }: Request): Promise<Response> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new CategoryNotExistsError(categoryId);
    }

    if (name) {
      const nameExists = await this.categoriesRepository.findByName(name);

      if (nameExists) {
        throw new NameAlreadyExistsError(name, 'category');
      }

      category.name = name;
    }

    await this.categoriesRepository.save(category);

    return category;
  }
}
