import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IController from '@shared/core/IController';
import { classToClass } from 'class-transformer';
import CreateUserService from '../services/CreateUserService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    name: string;
    password: string;
    email: string;
  }
>;

export default class UserController
  implements IController<CreateRequest, Response> {
  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { email, name, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ email, name, password });

    return res.json(classToClass(user));
  }
}
