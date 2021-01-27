import 'reflect-metadata';

import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';

import { CityNotExistsError } from '@modules/cities/errors/service';
import DeleteCityService from '.';

describe('DeleteCityService - unit', () => {
  let service: DeleteCityService;
  let repo: ICitiesRepository;

  let deleteFunc: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    service = new DeleteCityService(repo);

    deleteFunc = jest.spyOn(repo, 'delete');
  });

  it('should be able to delete an City', async () => {
    const cityId = 'fakeId';

    deleteFunc.mockImplementationOnce(() => 1);

    const result = await service.execute({ cityId });

    expect(result).toBe(1);
    expect(deleteFunc).toBeCalledWith(cityId);
  });

  it('should be return error if cityId not exists.', async () => {
    const cityId = 'fakeId';

    deleteFunc.mockImplementationOnce(() => null);

    await expect(service.execute({ cityId })).rejects.toEqual(
      new CityNotExistsError(cityId),
    );

    expect(deleteFunc).toBeCalledWith(cityId);
  });
});
