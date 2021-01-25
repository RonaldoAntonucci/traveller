/* eslint-disable import/prefer-default-export */
import CityController from '@modules/cities/controllers/CityController';
import { Router } from 'express';
import CreateCityValidator from '../validators/CreateCityValidator';

const citiesRouter = Router();

const cityController = new CityController();

citiesRouter.post('/', CreateCityValidator(), cityController.create);

export { citiesRouter };
