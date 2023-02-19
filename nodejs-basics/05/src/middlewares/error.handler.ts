import { ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { getValidationErrorMessage } from '../utils/get-validation-error-message';

export async function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction): Promise<void> {
  console.error('Middleware', err);
  if (err instanceof Array<ValidationError>) {
    const errorMessage = getValidationErrorMessage(err);
    res.status(400).json({ message: errorMessage });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}