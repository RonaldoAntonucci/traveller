import { Request, Response } from 'express';

import IController from '@shared/core/IController';
import { container } from 'tsyringe';
import CreateCityService from '../services/CreateCityService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    description: string;
    image: string;
  }
>;

export default class CityController
  implements IController<CreateRequest, Response> {
  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { description, name, image } = req.body;

    const createCity = container.resolve(CreateCityService);

    const city = await createCity.execute({ name, description, image });

    return res.json(city);
  }
}
