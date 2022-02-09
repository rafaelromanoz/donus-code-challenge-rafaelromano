import { NextFunction, Request, Response } from "express";
import { depositOnAccountService, tranferValueAccountsService } from "../services/accountServices";

const depositOnAccountController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const informations = await depositOnAccountService(req.body);
    return res.status(201).json(informations);
  } catch (error) {
    next(error);
  }
}

const tranferValueAccountsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const informations = await tranferValueAccountsService(req.body);
    return res.status(200).json(informations);
  } catch (error) {
    next(error);
  }
}

export {
  depositOnAccountController,
  tranferValueAccountsController,
}
