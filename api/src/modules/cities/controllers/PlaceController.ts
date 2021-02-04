import { Request, Response } from 'express';

import IController from '@shared/core/IController';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import CreatePlaceService from '../services/CreatePlaceService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    description: string;
    image: string;
    categoryId: string;
    address: {
      zipCode: string;
      street: string;
      neighborhood: string;
      number?: string;
    };
  }
>;

export default class PlaceController implements IController<Request, Response> {
  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { address, categoryId, description, name } = req.body;

    const createPlace = container.resolve(CreatePlaceService);

    const place = await createPlace.execute({
      address,
      categoryId,
      description,
      name,
    });

    return res.json(classToClass(place));
  }
}
