import City from '@modules/cities/domain/City';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import { NameAlreadyExistsError } from '@modules/cities/errors/service';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import IService from '@shared/core/IService';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateCityService
  implements IService<ICreateCityDTO, City> {
  constructor(
    @inject('CitiesRepository')
    private citiesRepo: ICitiesRepository,
  ) {}

  public async execute({
    description,
    image,
    name,
  }: ICreateCityDTO): Promise<City> {
    const nameExists = await this.citiesRepo.findByName(name);

    if (nameExists) {
      throw new NameAlreadyExistsError(name);
    }

    const city = await this.citiesRepo.create({ description, image, name });

    return city;
  }
}
