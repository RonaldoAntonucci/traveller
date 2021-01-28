import City from '@modules/cities/domain/City';
import FakeRepository from '@shared/util/FakeRepository';
import ICitiesRepository from '../ICitiesRepository';

export default class FakeCitiesRepository
  extends FakeRepository<City>
  implements ICitiesRepository {
  constructor() {
    super(City);
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = new City();
    city.name = name;
    return city;
  }
}
