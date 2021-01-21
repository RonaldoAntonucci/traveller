import { Router } from 'express';

import UserController from '@modules/users/controllers/UserController';
import CreateUserValidator from '../validators/CreateUserValidator';
import UpdateUserValidator from '../validators/UpdateUserValidator';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.find);

userRouter.post('/', CreateUserValidator(), userController.create);

userRouter.put('/:userId', UpdateUserValidator(), userController.update);

userRouter.delete('/:userId', userController.delete);

export default userRouter;
