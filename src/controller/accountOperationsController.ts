import { NextFunction, Request, Response } from "express";
import { depositOnAccountService } from "../services/accountServices";

const depositOnAccountController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const informations = await depositOnAccountService(req.body, req.user);
    return res.status(201).json(informations);
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export {
  depositOnAccountController,
}
