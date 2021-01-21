/* eslint-disable import/prefer-default-export */
import { Router } from 'express';

import UserController from '@modules/users/controllers/UserController';
import AuthJwtController from '@modules/users/controllers/AuthJwtController';
import CreateUserValidator from '../validators/CreateUserValidator';
import UpdateUserValidator from '../validators/UpdateUserValidator';
import AuthJwtValidator from '../validators/AuthJwtValidator';

const userRouter = Router();

const userController = new UserController();

userRouter.get('/', userController.find);

userRouter.post('/', CreateUserValidator(), userController.create);

userRouter.put('/:userId', UpdateUserValidator(), userController.update);

userRouter.delete('/:userId', userController.delete);

export { userRouter };

const signRouter = Router();

const authJwtController = new AuthJwtController();

signRouter.post('/jwt', AuthJwtValidator(), authJwtController.create);

export { signRouter };
