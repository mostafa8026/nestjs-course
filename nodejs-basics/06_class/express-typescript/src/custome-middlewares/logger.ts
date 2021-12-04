import { NextFunction, Request, Response } from "express";
import { reqLogger } from '../debug-loggers'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  reqLogger("a request is received ...");
  next();
};
