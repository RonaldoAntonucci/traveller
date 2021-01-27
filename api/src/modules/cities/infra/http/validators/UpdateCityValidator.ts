import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().min(3),
        description: Joi.string().min(3).max(392),
      },
    },
    { abortEarly: false },
  );
