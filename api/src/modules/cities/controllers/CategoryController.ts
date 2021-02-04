import { Request, Response } from 'express';

import IController from '@shared/core/IController';
import { container } from 'tsyringe';
import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import CreateCategoryService from '../services/CreateCategoryService';
import ListCategoriesService from '../services/ListCategoriesService';
import ShowCategoryService from '../services/ShowCategoryService';
import UpdateCategoryService from '../services/UpdateCategoryService';
import DeleteCategoryService from '../services/DeleteCategoryService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
  }
>;

type ShowRequest = Request<Record<string, string>>;

type UpdateRequest = Request<
  Record<string, string>,
  unknown,
  {
    name: string;
  }
>;

type DeleteRequest = Request<Record<string, string>>;

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

  public async show(req: ShowRequest, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const showCategory = container.resolve(ShowCategoryService);

    const category = await showCategory.execute({ categoryId });

    return res.json(category);
  }

  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { name } = req.body;

    const createCategory = container.resolve(CreateCategoryService);

    const category = await createCategory.execute({ name });

    return res.json(category);
  }

  public async update(req: UpdateRequest, res: Response): Promise<Response> {
    const { name } = req.body;

    const { categoryId } = req.params;

    const updateCategory = container.resolve(UpdateCategoryService);

    const updatedCategory = await updateCategory.execute({
      categoryId,
      name,
    });

    return res.json(updatedCategory);
  }

  public async delete(req: DeleteRequest, res: Response): Promise<Response> {
    const { categoryId } = req.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({ categoryId });

    return res.send();
  }
}
