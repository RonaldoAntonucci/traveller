/* eslint-disable import/prefer-default-export */
import { Router } from 'express';
import multer from 'multer';

import CityController from '@modules/cities/controllers/CityController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import CreateCityValidator from '../validators/CreateCityValidator';
import FileValidator from '../validators/FileValidator';

const citiesRouter = Router();

const cityController = new CityController();

const upload = multer(uploadConfig);

citiesRouter.use(ensureAuthenticated());

citiesRouter.get('/', cityController.index);

citiesRouter.get('/:cityId', cityController.show);

citiesRouter.post(
  '/',
  upload.single('image'),
  FileValidator(),
  CreateCityValidator(),
  cityController.create,
);

citiesRouter.put('/:cityId', cityController.update);

citiesRouter.delete('/:cityId', cityController.delete);

export { citiesRouter };
