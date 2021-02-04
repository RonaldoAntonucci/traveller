import { celebrate, Joi, Segments } from 'celebrate';
import { RequestHandler } from 'express';

export default (): RequestHandler =>
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().min(3).required(),
        description: Joi.string().min(3).max(392).required(),
        categoryId: Joi.string().uuid().required(),
        address: Joi.object().keys({
          zipCode: Joi.string()
            .regex(/[0-9]{5}-[0-9]{3}/)
            .required(),
          street: Joi.string().min(3).required(),
          neighborhood: Joi.string().min(3).required(),
          number: Joi.string(),
        }),
      },
    },
    { abortEarly: false },
  );
