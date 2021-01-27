import City from '@modules/cities/domain/City';
import IShowCityDTO from '@modules/cities/dtos/IShowCityDTO';
import { CityNotExistsError } from '@modules/cities/errors/service';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IShowCityDTO;
type Response = City;

@injectable()
export default class ShowCityService implements IService<Request, Response> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({ cityId }: Request): Promise<Response> {
    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotExistsError(cityId);
    }

    return city;
  }
}
