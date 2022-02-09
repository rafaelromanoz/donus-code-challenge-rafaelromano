import { NextFunction, Request, Response } from "express";

export default (error: any, _req: Request, res: Response, next: NextFunction) => {
  if (error.errorCode) {
    const { errorCode, message } = error;
    return res.status(errorCode).json({ message });
    next();
  }
  return res.status(500).json({ message: "Internal error" });
};
