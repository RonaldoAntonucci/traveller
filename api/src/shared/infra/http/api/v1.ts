import { Router } from 'express';

import { userRouter, signRouter } from '@modules/users/infra/http/routes';

import { citiesRouter } from '@modules/cities/infra/http/routes';

import PaginationQueriesValidator from '../middlewares/PaginationQueriesValidator';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use(PaginationQueriesValidator());

v1Router.use('/users', userRouter);

v1Router.use('/signin', signRouter);

v1Router.use('/cities', citiesRouter);

export default v1Router;
