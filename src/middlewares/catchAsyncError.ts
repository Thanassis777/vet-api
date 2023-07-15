import { NextFunction, Request, Response } from 'express';

export const catchAsyncError = (fn) => (req: Request, res: Response, next: NextFunction) =>
  fn(req, res, next).catch(next);
