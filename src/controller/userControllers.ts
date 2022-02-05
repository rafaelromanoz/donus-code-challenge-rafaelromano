import { Response, Request, NextFunction } from "express";
import { createUserService } from "../services/userService";

const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUserService(req.body);
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export { createUserController };
