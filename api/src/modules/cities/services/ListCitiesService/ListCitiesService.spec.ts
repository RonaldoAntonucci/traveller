import 'reflect-metadata';

import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import ListResponse from '@shared/core/ListResponse';
import InvalidParamsError from '@shared/errors/InvalidParamsErrors';
import ICitiesRepository from '@modules/cities/repositories/ICitiesRepository';
import FakeCitiesRepository from '@modules/cities/repositories/fakes/FakeCitiesRepository';
import City from '@modules/cities/domain/City';
import ListCitiesService from '.';

describe('List Cities Service - unit', () => {
  let service: ListCitiesService;
  let repo: ICitiesRepository;

  let findAndCount: jest.SpyInstance;

  beforeEach(() => {
    repo = new FakeCitiesRepository();
    service = new ListCitiesService(repo);

    findAndCount = jest.spyOn(repo, 'findAndCount');
  });

  it('Should be able to list Cities.', async () => {
    const params = new PaginationParams();

    findAndCount.mockImplementationOnce(() => new ListResponse<City>());

    const cities = await service.execute(params);

    expect(cities instanceof ListResponse).toBe(true);
    expect(findAndCount).toBeCalledWith(params);
  });

  it('should not be able to list cities without valid params.', async () => {
    const params = { offset: 0, count: 20, order: 'DESC' as OrderType };

    await expect(service.execute(params)).rejects.toEqual(
      new InvalidParamsError(),
    );

    expect(findAndCount).not.toBeCalled();
  });
});
