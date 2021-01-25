import IService from '@shared/core/IService';
import PaginationParams from '@shared/core/PaginationParams';
import { inject, injectable } from 'tsyringe';
import ListResponse from '@shared/core/ListResponse';
import InvalidParamsError from '@shared/errors/InvalidParamsErrors';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import City from '@modules/cities/domain/City';

type IRequestDTO = PaginationParams;

type IResponse = ListResponse<City>;

@injectable()
export default class ListCitiesService
  implements IService<IRequestDTO, IResponse> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute(paginationParams: PaginationParams): Promise<IResponse> {
    if (!(paginationParams instanceof PaginationParams)) {
      throw new InvalidParamsError();
    }

    return this.citiesRepository.findAndCount(paginationParams);
  }
}
