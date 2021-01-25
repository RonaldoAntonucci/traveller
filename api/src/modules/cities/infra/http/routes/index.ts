/* eslint-disable import/prefer-default-export */
import CityController from '@modules/cities/controllers/CityController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { Router } from 'express';
import CreateCityValidator from '../validators/CreateCityValidator';

const citiesRouter = Router();

const cityController = new CityController();

citiesRouter.use(ensureAuthenticated());

citiesRouter.get('/', cityController.find);

citiesRouter.post('/', CreateCityValidator(), cityController.create);

export { citiesRouter };
