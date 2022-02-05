import express from 'express';
import { createUserController } from '../controller/userControllers';

const userRouter = express.Router();

userRouter.post('/', createUserController);

export default userRouter;
