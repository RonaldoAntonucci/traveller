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

citiesRouter.get('/', cityController.find);

citiesRouter.post(
  '/',
  upload.single('image'),
  FileValidator(),
  CreateCityValidator(),
  cityController.create,
);

export { citiesRouter };
