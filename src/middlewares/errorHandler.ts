import { NextFunction, Request, Response } from "express";

export default (error, _req: Request, res: Response, next: NextFunction) => {
  console.log('🚀 ~ file: errorHandler.ts ~ line 4 ~ error', error);
  if (error.errorCode) {
    const { errorCode, message } = error;
    return res.status(errorCode).json({ message });
    next();
  }
  return res.status(500).json({ message: "Internal error" });
};
