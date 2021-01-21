import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false },
  );
