import City from '@modules/cities/domain/City';
import FakeCity from '@modules/cities/domain/fakes/FakeCity';
import {
  CityNotExistsError,
  ImageInvalidError,
} from '@modules/cities/errors/service';
import FakeStorageProvider from '@modules/cities/providers/StorageProvider/FakeStorageProvider';
import IStorageProvider from '@modules/cities/providers/StorageProvider/IStorageProvider';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import 'reflect-metadata';
import UpdateCityImageService from '.';

describe('UpdateCityImageService - unit', () => {
  let service: UpdateCityImageService;
  let repo: ICitiesRepository;
  let storageProvider: IStorageProvider;

  let checkCity: jest.SpyInstance;
  let checkDeleteFile: jest.SpyInstance;
  let checkFilename: jest.SpyInstance;
  let checkUpdateCity: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    storageProvider = new FakeStorageProvider();
    service = new UpdateCityImageService(repo, storageProvider);

    checkCity = jest.spyOn(repo, 'findById');
    checkDeleteFile = jest.spyOn(storageProvider, 'deleteFile');
    checkFilename = jest.spyOn(storageProvider, 'saveFile');
    checkUpdateCity = jest.spyOn(repo, 'save');
  });

  it('should be able to updated City Image', async () => {
    const cityId = 'fakeId';
    const imageFilename = 'imageFilename';

    const city = FakeCity();
    const prevFilename = city.image;

    checkCity.mockImplementationOnce(() => city);

    checkFilename.mockImplementationOnce(() => imageFilename);

    checkUpdateCity.mockImplementationOnce(() => new City());

    const updatedCity = await service.execute({ cityId, imageFilename });

    expect(updatedCity).toBeInstanceOf(City);
    expect(checkCity).toBeCalledWith(cityId);
    expect(checkDeleteFile).toBeCalledWith(prevFilename);
    expect(checkFilename).toBeCalledWith(imageFilename);
    expect(checkUpdateCity).toBeCalledWith(city);
  });

  it('should not be able to update image if city not exists.', async () => {
    const cityId = 'fakeId';
    const imageFilename = 'imageFilename';

    checkCity.mockImplementationOnce(() => undefined);

    await expect(service.execute({ cityId, imageFilename })).rejects.toEqual(
      new CityNotExistsError(cityId),
    );

    expect(checkCity).toBeCalledWith(cityId);
    expect(checkDeleteFile).not.toBeCalled();
    expect(checkFilename).not.toBeCalled();
    expect(checkUpdateCity).not.toBeCalled();
  });

  it('should not be able to update image if file not exists.', async () => {
    const cityId = 'fakeId';
    const imageFilename = 'imageFilename';

    const city = FakeCity();
    const prevFilename = city.image;

    checkCity.mockImplementationOnce(() => city);

    checkFilename.mockImplementationOnce(() => null);

    await expect(service.execute({ cityId, imageFilename })).rejects.toEqual(
      new ImageInvalidError(),
    );

    expect(checkCity).toBeCalledWith(cityId);
    expect(checkDeleteFile).toBeCalledWith(prevFilename);
    expect(checkFilename).toBeCalledWith(imageFilename);
    expect(checkUpdateCity).not.toBeCalled();
  });
});
