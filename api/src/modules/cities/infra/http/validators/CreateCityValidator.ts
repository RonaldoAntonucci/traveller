import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().min(3).required(),
        image: Joi.string().min(4).required(),
        description: Joi.string().required(),
      },
    },
    { abortEarly: false },
  );
