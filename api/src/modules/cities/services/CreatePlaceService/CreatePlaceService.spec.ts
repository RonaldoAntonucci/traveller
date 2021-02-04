import FakePlace from '@modules/cities/domain/fakes/FakePlace';
import Place from '@modules/cities/domain/Place';
import ICreatePlaceDTO from '@modules/cities/dtos/ICreatePlaceDTO';
import FakePlacesRepository from '@modules/cities/repositories/fakes/FakePlacesRepository';
import IPlacesRepository from '@modules/cities/repositories/IPlacesRepository';
import 'reflect-metadata';

import CreatePlaceService from '.';

describe('CreatePlaceService - unit', () => {
  let service: CreatePlaceService;
  let repo: IPlacesRepository;

  let checkName: jest.SpyInstance;
  let checkCreate: jest.SpyInstance;

  beforeAll(() => {
    repo = new FakePlacesRepository();
    service = new CreatePlaceService(repo);

    checkName = jest.spyOn(repo, 'findByName');
    checkCreate = jest.spyOn(repo, 'create');
  });

  it('should be defined.', () => {
    expect(service).toBeDefined();
  });

  it('should be able to create a new Place.', async () => {
    const placeAttrs = FakePlace();

    checkName.mockImplementationOnce(() => undefined);

    const place = await service.execute(placeAttrs as ICreatePlaceDTO);

    expect(place).toBeInstanceOf(Place);

    expect(checkName).toBeCalledWith(placeAttrs.name);
    expect(checkCreate).toBeCalled();
  });
});
