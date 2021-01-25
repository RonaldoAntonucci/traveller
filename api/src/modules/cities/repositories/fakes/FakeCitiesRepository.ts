import City from '@modules/cities/domain/City';
import ICreateCityDTO from '@modules/cities/dtos/ICreateCityDTO';
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
}
