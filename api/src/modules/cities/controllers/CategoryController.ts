import { Request, Response } from 'express';

import IController from '@shared/core/IController';
import { container } from 'tsyringe';
import CreateCategoryService from '../services/CreateCategoryService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
  }
>;

export default class CategoryController
  implements IController<Request, Response> {
  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { name } = req.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ name });

    return res.json(category);
  }
}
