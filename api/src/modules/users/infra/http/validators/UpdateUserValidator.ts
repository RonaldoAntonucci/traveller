import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().min(3),
        email: Joi.string().email(),
        password: Joi.string(),
        oldPassword: Joi.string().when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
      },
    },
    { abortEarly: false },
  );
