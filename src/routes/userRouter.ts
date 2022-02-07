import express from 'express';
import { createUserAndAccountController } from '../controller/userControllers';

const userRouter = express.Router();

userRouter.post('/', createUserAndAccountController);

export default userRouter;
