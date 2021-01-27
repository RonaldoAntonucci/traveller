import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
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

  public async findById(id: string): Promise<CityEntity | undefined> {
    const city = await this.ormRepo.findOne({ id });

    return city;
  }

  public async findByName(name: string): Promise<CityEntity | undefined> {
    const city = await this.ormRepo.findOne({ name });

    return city;
  }

  public async findAndCount({
    count,
    order,
    offset,
  }: PaginationParams): Promise<ListResponse<CityEntity>> {
    const [cities, total] = await this.ormRepo.findAndCount({
      order: { createdAt: order },
      take: count,
      skip: offset,
    });

    return new ListResponse<CityEntity>({ data: cities, total, count, offset });
  }

  public async save(city: CityEntity): Promise<CityEntity> {
    return this.ormRepo.save(city);
  }

  public async delete(cityId: string): Promise<number | null | undefined> {
    const result = await this.ormRepo.delete({ id: cityId });

    return result.affected;
  }
}
