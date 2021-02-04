import { Request, Response } from 'express';

import IController from '@shared/core/IController';
import { container } from 'tsyringe';
import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
  }
>;

export default class CategoryController
  implements IController<Request, Response> {
  public async index(req: Request, res: Response): Promise<Response> {
    const { offset, count, order } = req.query;

    const params = new PaginationParams({
      offset: Number(offset),
      count: Number(count),
      order: order as OrderType,
    });

    const listCategories = container.resolve(ListCategoriesService);

    const { data, total } = await listCategories.execute(params);

    return res.json({ data, total });
  }

  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { name } = req.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ name });

    return res.json(category);
  }
}
