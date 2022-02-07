import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { depositOnAccountController, tranferValueAccountsController } from '../controller/accountOperationsController';

const accountRouter = express.Router();

accountRouter.post('/deposit', authMiddleware, depositOnAccountController);
accountRouter.post('/transfer', authMiddleware, tranferValueAccountsController);

export default accountRouter;
