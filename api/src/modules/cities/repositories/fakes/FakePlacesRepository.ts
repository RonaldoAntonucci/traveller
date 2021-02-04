import Place from '@modules/cities/domain/Place';
import FakeRepository from '@shared/util/FakeRepository';
import IPlacesRepository from '../IPlacesRepository';

export default class FakePlacesRepository
  extends FakeRepository<Place>
  implements IPlacesRepository {
  constructor() {
    super(Place);
  }

  public async findByName(name: string): Promise<undefined | Place> {
    const place = new Place();
    place.name = name;

    return place;
  }
}
