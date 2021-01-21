import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import IController from '@shared/core/IController';
import AuthUserService from '../services/AuthUserService';

type CreateRequest = Request<
  unknown,
  unknown,
  {
    password: string;
    email: string;
  }
>;

export default class AuthJwtController
  implements IController<Request, Response> {
  public async create(req: CreateRequest, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authJwt = container.resolve(AuthUserService);

    const auth = await authJwt.execute({ email, password });

    return res.json({ token: auth.token, user: classToClass(auth.user) });
  }
}
