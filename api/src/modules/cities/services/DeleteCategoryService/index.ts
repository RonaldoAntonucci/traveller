import IDeleteCategoryDTO from '@modules/cities/dtos/IDeleteCategoryDTO';
import { CategoryNotExistsError } from '@modules/cities/errors/service';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IDeleteCategoryDTO;

type Response = number;

@injectable()
export default class DeleteCategoryService
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

    const deleteResult = (await this.categoriesRepository.delete(
      categoryId,
    )) as number;

    return deleteResult;
  }
}
