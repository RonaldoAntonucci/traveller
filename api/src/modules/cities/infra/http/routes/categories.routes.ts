/* eslint-disable import/prefer-default-export */
import { Router } from 'express';

import CategoryController from '@modules/cities/controllers/CategoryController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateCategoryValidator from '../validators/CreateCategoryValidator';

const citiesRouter = Router();

const categoryController = new CategoryController();

citiesRouter.use(ensureAuthenticated());

citiesRouter.post('/', CreateCategoryValidator(), categoryController.create);

export default citiesRouter;
