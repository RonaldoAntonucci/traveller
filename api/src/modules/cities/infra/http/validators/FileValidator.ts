import ImageIsRequiredError from '@modules/cities/errors/ImageIsRequiredError';
import { NextFunction, Request, RequestHandler, Response } from 'express';

export default (): RequestHandler => (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const { file } = req;

  if (!file || !file.filename) {
    throw new ImageIsRequiredError();
  }

  return next();
};
