import 'reflect-metadata';

import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import { CityNotExistsError } from '@modules/cities/errors/service';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import FakeStorageProvider from '@modules/cities/providers/StorageProvider/FakeStorageProvider';
import FakeCity from '@modules/cities/domain/fakes/FakeCity';
import DeleteCityService from '.';

describe('DeleteCityService - unit', () => {
  let service: DeleteCityService;
  let repo: ICitiesRepository;
  let storageProvider: IStorageProvider;

  let deleteFunc: jest.SpyInstance;
  let checkDeleteFile: jest.SpyInstance;
  let checkCity: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    storageProvider = new FakeStorageProvider();
    service = new DeleteCityService(repo, storageProvider);

    deleteFunc = jest.spyOn(repo, 'delete');
    checkCity = jest.spyOn(repo, 'findById');
    checkDeleteFile = jest.spyOn(storageProvider, 'deleteFile');
  });

  it('should be able to delete an City', async () => {
    const cityId = 'fakeId';

    const city = FakeCity();

    checkCity.mockImplementationOnce(() => city);
    deleteFunc.mockImplementationOnce(() => 1);

    const result = await service.execute({ cityId });

    expect(result).toBe(1);
    expect(deleteFunc).toBeCalledWith(cityId);
    expect(checkCity).toBeCalledWith(cityId);
    expect(checkDeleteFile).toBeCalledWith(city.image);
  });

  it('should be return error if cityId not exists.', async () => {
    const cityId = 'fakeId';

    checkCity.mockImplementationOnce(() => undefined);

    await expect(service.execute({ cityId })).rejects.toEqual(
      new CityNotExistsError(cityId),
    );

    expect(deleteFunc).not.toBeCalled();
    expect(checkCity).toBeCalledWith(cityId);
    expect(checkDeleteFile).not.toBeCalled();
  });
});
