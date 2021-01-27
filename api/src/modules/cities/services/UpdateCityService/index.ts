import City from '@modules/cities/domain/City';
import IUpdateCityDTO from '@modules/cities/dtos/IUpdateCityDTO';
import {
  CityNotExistsError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

type Request = IUpdateCityDTO;
type Response = City;

@injectable()
export default class UpdateCityService implements IService<Request, Response> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
  ) {}

  public async execute({
    cityId,
    name,
    description,
  }: Request): Promise<Response> {
    const city = await this.citiesRepository.findById(cityId);

    if (!city) {
      throw new CityNotExistsError(cityId);
    }

    if (name) {
      const nameExists = await this.citiesRepository.findByName(name);

      if (nameExists) {
        throw new NameAlreadyExistsError(name);
      }

      city.name = name;
    }

    if (description) {
      city.description = description;
    }

    return this.citiesRepository.save(city);
  }
}
