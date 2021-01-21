import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.QUERY]: {
        offset: Joi.number().min(0),
        count: Joi.number().min(1),
        order: Joi.string().equal('ASC', 'DESC'),
      },
    },
    { abortEarly: false },
  );
