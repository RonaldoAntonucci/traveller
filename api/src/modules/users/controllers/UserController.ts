import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IController from '@shared/core/IController';

import PaginationParams, { OrderType } from '@shared/core/PaginationParams';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUsersService';

type FindRequest = Request;

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    password: string;
    email: string;
  }
>;

export default class UserController implements IController<Request, Response> {
  public async find(req: FindRequest, res: Response): Promise<Response> {
    const findUsers = container.resolve(ListUsersService);

    const { offset, count, order } = req.query;

    const params = new PaginationParams({
      offset: Number(offset),
      count: Number(count),
      order: order as OrderType,
    });

    const { data, total } = await findUsers.execute(params);

    return res.json({ data, total });
  }

  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, name, password });

    return res.json(classToClass(user));
  }
}
