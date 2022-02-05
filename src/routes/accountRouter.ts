import express from 'express';
import { depositOnAccountController } from '../controller/accountOperationsController';

const accountRouter = express.Router();

accountRouter.post('/deposit', depositOnAccountController);

export default accountRouter;
