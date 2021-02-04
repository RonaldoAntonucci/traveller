/* eslint-disable import/prefer-default-export */
import { Router } from 'express';

import CategoryController from '@modules/cities/controllers/CategoryController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreateCategoryValidator from '../validators/CreateCategoryValidator';

const categoriesRouter = Router();

const categoryController = new CategoryController();

categoriesRouter.use(ensureAuthenticated());

categoriesRouter.get('/', categoryController.index);

categoriesRouter.get('/:categoryId', categoryController.show);

categoriesRouter.post(
  '/',
  CreateCategoryValidator(),
  categoryController.create,
);

export default categoriesRouter;
