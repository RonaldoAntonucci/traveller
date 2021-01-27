import 'reflect-metadata';

import FakeCity from '@modules/cities/domain/fakes/FakeCity';
import {
  CityNotExistsError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import City from '@modules/cities/domain/City';
import UpdateCityService from '.';

describe('Update City Service - unit', () => {
  let service: UpdateCityService;
  let repo: ICitiesRepository;

  let checkCity: jest.SpyInstance;
  let checkName: jest.SpyInstance;
  let checkCityUpdate: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    service = new UpdateCityService(repo);

    checkCity = jest.spyOn(repo, 'findById');
    checkName = jest.spyOn(repo, 'findByName');
    checkCityUpdate = jest.spyOn(repo, 'save');
  });

  it('should be able to update city(name, description).', async () => {
    const cityAttrs = FakeCity();
    const cityId = 'fakeId';

    checkCity.mockImplementationOnce(() => {
      const c = FakeCity();
      c.image = cityAttrs.image;
      return c;
    });
    checkName.mockImplementationOnce(() => undefined);

    const updatedCity = await service.execute({
      cityId,
      ...cityAttrs,
    });

    expect(updatedCity).toEqual(cityAttrs);

    expect(checkCity).toBeCalledWith(cityId);
    expect(checkName).toBeCalledWith(cityAttrs.name);
    expect(checkCityUpdate).toBeCalledWith(cityAttrs);
  });

  it('should not be able to update city without valid CityId.', async () => {
    const cityAttrs = FakeCity();

    checkCity.mockImplementationOnce(() => undefined);

    await expect(
      service.execute({ ...cityAttrs, cityId: 'fakeId' }),
    ).rejects.toEqual(new CityNotExistsError('fakeId'));

    expect(checkCity).toBeCalledWith('fakeId');
    expect(checkName).not.toBeCalled();
    expect(checkCityUpdate).not.toBeCalled();
  });

  it('should not be able to change to another city name if new name is already in use.', async () => {
    const cityAttrs = FakeCity();
    cityAttrs.id = 'fakeId';

    checkCity.mockImplementationOnce(async () => new City());
    checkName.mockImplementationOnce(async () => new City());

    await expect(
      service.execute({
        ...cityAttrs,
        cityId: 'fakeId',
      }),
    ).rejects.toEqual(new NameAlreadyExistsError(cityAttrs.name));

    expect(checkCity).toBeCalledWith('fakeId');
    expect(checkName).toBeCalledWith(cityAttrs.name);
    expect(checkCityUpdate).not.toBeCalled();
  });
});
