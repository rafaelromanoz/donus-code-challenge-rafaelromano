import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { depositOnAccountController } from '../controller/accountOperationsController';

const accountRouter = express.Router();

accountRouter.post('/deposit',authMiddleware, depositOnAccountController);

export default accountRouter;
