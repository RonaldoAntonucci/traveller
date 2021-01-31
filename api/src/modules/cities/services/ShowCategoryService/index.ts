import Category from '@modules/cities/domain/Category';
import IShowCategoryDTO from '@modules/cities/dtos/IShowCategoryDTO';
import { CategoryNotExistsError } from '@modules/cities/errors/service';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IShowCategoryDTO;
type Response = Category;

@injectable()
export default class ShowCategoryService
  implements IService<Request, Response> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ categoryId }: Request): Promise<Response> {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new CategoryNotExistsError(categoryId);
    }

    return category;
  }
}
