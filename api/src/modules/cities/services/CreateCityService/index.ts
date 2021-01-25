import City from '@modules/cities/domain/City';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
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
    const city = await this.citiesRepo.create({ description, image, name });

    return city;
  }
}
