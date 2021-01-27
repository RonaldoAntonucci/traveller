import IDeleteUserDTO from '@modules/cities/dtos/IDeleteUserDTO';
import { CityNotExistsError } from '@modules/cities/errors/service';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IDeleteUserDTO;

type Response = number;

@injectable()
export default class DeleteCityService implements IService<Request, Response> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ cityId }: Request): Promise<Response> {
    const deleteResult = await this.citiesRepository.delete(cityId);

    if (!deleteResult) {
      throw new CityNotExistsError(cityId);
    }

    return deleteResult;
  }
}
