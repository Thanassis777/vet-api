import { catchAsyncError } from './catchAsyncError';
import AppError from '../utils/appError';
import { StatusCodes } from '../constants/statusCodes';
import { NextFunction, Request, Response } from 'express';

// middleware used in ver/client update method
export const checkForPasswordField = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(AppError('This route is not for updating password', StatusCodes.BAD_REQUEST));
  }

  next();
});
