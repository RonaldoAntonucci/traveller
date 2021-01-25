import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import { getRepository, Repository } from 'typeorm';
import CityEntity from '../entities/CityEntity';

export default class CitiesRepository implements ICitiesRepository {
  private ormRepo: Repository<CityEntity>;

  constructor() {
    this.ormRepo = getRepository(CityEntity);
  }

  public async create({
    description,
    image,
    name,
  }: ICreateCityDTO): Promise<CityEntity> {
    const city = this.ormRepo.create({ description, image, name });

    await this.ormRepo.save(city);

    return city;
  }
}
