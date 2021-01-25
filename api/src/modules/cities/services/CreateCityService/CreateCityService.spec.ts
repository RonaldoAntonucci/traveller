import 'reflect-metadata';

import City from '@modules/cities/domain/City';
import FakeCity from '@modules/cities/domain/fakes/FakeCity';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import { NameAlreadyExistsError } from '@modules/cities/errors/service';
import CreateCityService from '.';

describe('CreateCityService', () => {
  let service: CreateCityService;
  let repo: ICitiesRepository;

  let checkName: jest.SpyInstance;
  let createCity: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    service = new CreateCityService(repo);

    checkName = jest.spyOn(repo, 'findByName');

    createCity = jest.spyOn(repo, 'create');
  });

  it('should be able to create a new city.', async () => {
    const cityAttrs = FakeCity();

    checkName.mockImplementationOnce(() => undefined);

    const city = await service.execute(cityAttrs);

    expect(city).toBeInstanceOf(City);
    expect(checkName).toBeCalledWith(cityAttrs.name);
    expect(createCity).toBeCalledWith(cityAttrs);
  });

  it('should be not able to create a new City if name already in use.', async () => {
    const userAttrs = FakeCity();

    checkName.mockImplementationOnce(async () => new City());

    await expect(service.execute(userAttrs)).rejects.toEqual(
      new NameAlreadyExistsError(userAttrs.name),
    );

    expect(checkName).toBeCalledWith(userAttrs.name);
    expect(createCity).not.toBeCalled();
  });
});
