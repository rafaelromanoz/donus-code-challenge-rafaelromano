import { NextFunction, Request, Response } from "express";
import { CustomError } from "../types/types";

export default (error: CustomError, _req: Request, res: Response, next: NextFunction) => {
  if (error.errorCode) {
    const { errorCode, message } = error;
    return res.status(errorCode).json({ message });
    next();
  }
  return res.status(500).json({ message: "Internal error" });
};
