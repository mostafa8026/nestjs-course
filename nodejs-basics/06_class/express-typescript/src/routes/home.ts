import express, { NextFunction, Request, Response } from "express";

const route = express.Router();

route.get("/", (req: Request, res: Response) => {
  res.send("<b>hello world</b>");
});

export { route };
