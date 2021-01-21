import { Router } from 'express';

import UserController from '@modules/users/controllers/UserController';

const userRouter = Router();

const userController = new UserController();

userRouter.post('/', userController.create);

export default userRouter;
