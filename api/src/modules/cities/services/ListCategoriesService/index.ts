import IService from '@shared/core/IService';
import PaginationParams from '@shared/core/PaginationParams';
import { inject, injectable } from 'tsyringe';
import ListResponse from '@shared/core/ListResponse';
import InvalidParamsError from '@shared/errors/InvalidParamsErrors';
import ICategoriesRepository from '@modules/cities/repositories/ICategoriesRepository';
import Category from '@modules/cities/domain/Category';

type IRequestDTO = PaginationParams;

type IResponse = ListResponse<Category>;

@injectable()
export default class ListCategoriesService
  implements IService<IRequestDTO, IResponse> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute(paginationParams: PaginationParams): Promise<IResponse> {
    if (!(paginationParams instanceof PaginationParams)) {
      throw new InvalidParamsError();
    }

    return this.categoriesRepository.findAndCount(paginationParams);
  }
}
