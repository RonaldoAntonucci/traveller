import { Router } from 'express';
import usersRouter from '@modules/users/infra/http/routes';
import PaginationQueriesValidator from '../middlewares/PaginationQueriesValidator';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use(PaginationQueriesValidator());

v1Router.use('/users', usersRouter);

export default v1Router;
