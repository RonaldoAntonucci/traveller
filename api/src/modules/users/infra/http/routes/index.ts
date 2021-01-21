import { Router } from 'express';

import UserController from '@modules/users/controllers/UserController';
import CreateUserValidator from '../validators/CreateUserValidator';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', CreateUserValidator(), userController.create);

export default userRouter;
