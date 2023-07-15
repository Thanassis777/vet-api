import * as process from 'process';
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { Document } from 'mongoose';

import { catchAsyncError } from './catchAsyncError';
import { StatusCodes } from '../constants/statusCodes';

import AppError from '../utils/appError';

import Client from '../models/clientsModel';
import Vet from '../models/vetsModel';

interface UserRequest extends Request {
  user: Document;
}

export const protectRouter = catchAsyncError(async (req: UserRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return next(AppError('You are not logged in! Please log in to get access.', StatusCodes.UNAUTHORIZED));
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err: VerifyErrors, decoded: JwtPayload) => {
    if (err) {
      return next(AppError('Invalid signature!', StatusCodes.UNAUTHORIZED));
    } else {
      const currentClient = await Client.findById(decoded.id);
      const currentVet = await Vet.findById(decoded.id);

      const currentUser = currentClient ?? currentVet;

      if (!currentUser) {
        return next(AppError('The user belonging to this token does no longer exist.', StatusCodes.UNAUTHORIZED));
      }
      if (currentUser.changedPasswordAfter(decoded.iat.toString())) {
        return next(AppError('User recently changed password! Please log in again.', StatusCodes.UNAUTHORIZED));
      }

      req.user = currentUser;
      next();
    }
  });
});
