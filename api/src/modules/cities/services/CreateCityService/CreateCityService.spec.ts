import 'reflect-metadata';

import City from '@modules/cities/domain/City';
import FakeCity from '@modules/cities/domain/fakes/FakeCity';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import {
  ImageInvalidError,
  NameAlreadyExistsError,
} from '@modules/cities/errors/service';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import FakeStorageProvider from '@modules/cities/providers/StorageProvider/FakeStorageProvider';
import CreateCityService from '.';

describe('CreateCityService - unit', () => {
  let service: CreateCityService;
  let repo: ICitiesRepository;
  let storageProvidder: IStorageProvider;

  let checkName: jest.SpyInstance;
  let createCity: jest.SpyInstance;
  let checkFile: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    storageProvidder = new FakeStorageProvider();
    service = new CreateCityService(repo, storageProvidder);

    checkName = jest.spyOn(repo, 'findByName');
    checkFile = jest.spyOn(storageProvidder, 'saveFile');
    createCity = jest.spyOn(repo, 'create');
  });

  it('should be able to create a new city.', async () => {
    const cityAttrs = FakeCity();

    checkName.mockImplementationOnce(() => undefined);

    const city = await service.execute(cityAttrs);

    expect(city).toBeInstanceOf(City);
    expect(checkName).toBeCalledWith(cityAttrs.name);
    expect(createCity).toBeCalledWith(cityAttrs);
    expect(checkFile).toBeCalledWith(cityAttrs.image);
  });

  it('should be not able to create a new City if name already in use.', async () => {
    const userAttrs = FakeCity();

    checkName.mockImplementationOnce(async () => new City());

    await expect(service.execute(userAttrs)).rejects.toEqual(
      new NameAlreadyExistsError(userAttrs.name),
    );

    expect(checkName).toBeCalledWith(userAttrs.name);
    expect(createCity).not.toBeCalled();
    expect(checkFile).not.toBeCalled();
  });

  it('should not be able to create a new City if file not exists.', async () => {
    const cityAttrs = FakeCity();

    checkName.mockImplementationOnce(() => undefined);

    checkFile.mockImplementationOnce(() => null);

    await expect(service.execute(cityAttrs)).rejects.toEqual(
      new ImageInvalidError(),
    );

    expect(checkName).toBeCalledWith(cityAttrs.name);
    expect(checkFile).toBeCalledWith(cityAttrs.image);
    expect(createCity).not.toBeCalled();
  });
});
