/* eslint-disable import/prefer-default-export */
import { Router } from 'express';

import PlaceController from '@modules/cities/controllers/PlaceController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import CreatePlaceValidator from '../validators/CreatePlaceValidator';

const placesRouter = Router();

const categoryController = new PlaceController();

placesRouter.use(ensureAuthenticated());

placesRouter.post('/', CreatePlaceValidator(), categoryController.create);

export default placesRouter;
