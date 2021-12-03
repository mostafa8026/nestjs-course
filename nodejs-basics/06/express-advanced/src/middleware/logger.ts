import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log("Logging ...");
  next(); // remove it to see what will happen :)
}
