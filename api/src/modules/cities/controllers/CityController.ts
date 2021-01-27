import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IController from '@shared/core/IController';
import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import CreateCityService from '../services/CreateCityService';
import ListCitiesService from '../services/ListCitiesService';

type FindRequest = Request;

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    description: string;
  }
>;

export default class CityController implements IController<Request, Response> {
  public async find(req: FindRequest, res: Response): Promise<Response> {
    const findCities = container.resolve(ListCitiesService);

    const { offset, count, order } = req.query;

    const params = new PaginationParams({
      offset: Number(offset),
      count: Number(count),
      order: order as OrderType,
    });

    const { data, total } = await findCities.execute(params);

    return res.json({ data: classToClass(data), total });
  }

  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { description, name } = req.body;
    const image = req.file.filename;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({
      name,
      description,
      image,
    });

    return res.json(city);
  }
}
