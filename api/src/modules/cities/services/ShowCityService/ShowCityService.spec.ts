import City from '@modules/cities/domain/City';
import { CityNotExistsError } from '@modules/cities/errors/service';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import 'reflect-metadata';
import ShowCityService from '.';

describe('ShowCityService - unit', () => {
  let service: ShowCityService;
  let repo: ICitiesRepository;

  let checkCity: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    service = new ShowCityService(repo);

    checkCity = jest.spyOn(repo, 'findById');
  });

  it('should be able to show city.', async () => {
    const fakeId = 'fakeId';

    checkCity.mockImplementationOnce(() => new City());

    const city = await service.execute({ cityId: fakeId });

    expect(city).toBeInstanceOf(City);
    expect(checkCity).toBeCalledWith(fakeId);
  });

  it('should not be able to show city if city not exists.', async () => {
    const fakeId = 'fakeId';

    checkCity.mockImplementationOnce(() => undefined);

    await expect(service.execute({ cityId: fakeId })).rejects.toEqual(
      new CityNotExistsError(fakeId),
    );

    expect(checkCity).toBeCalledWith(fakeId);
  });
});
