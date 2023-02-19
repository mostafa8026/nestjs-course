
import express from 'express';

let requestCount = 0;

export default function counter(req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log('Number of requests until now: ', ++requestCount);

  next();
}