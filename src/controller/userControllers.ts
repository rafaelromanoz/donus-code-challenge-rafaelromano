import { Response, Request, NextFunction } from "express";
import { createUserAndAccountService } from "../services/userService";

const createUserAndAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserAndAccountService(req.body);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { createUserAndAccountController };
