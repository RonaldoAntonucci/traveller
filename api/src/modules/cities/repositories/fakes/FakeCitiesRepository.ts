import City from '@modules/cities/domain/City';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
import ListResponse from '@shared/core/ListResponse';
import PaginationParams from '@shared/core/PaginationParams';
import ICitiesRepository from '../ICitiesRepository';

export default class FakeCitiesRepository implements ICitiesRepository {
  public async create(data: ICreateCityDTO): Promise<City> {
    const city = new City();

    Object.assign(city, data);

    return city;
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = new City();
    city.name = name;
    return city;
  }

  public async findAndCount({
    count,
    offset,
  }: PaginationParams): Promise<ListResponse<City>> {
    const cities = [];

    for (let i = count; i > 0; i -= 1) {
      cities.push(new City());
    }

    return new ListResponse<City>({
      data: cities,
      total: count + offset,
      count,
      offset,
    });
  }
}
