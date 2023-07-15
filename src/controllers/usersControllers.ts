import { NextFunction, Request, RequestHandler, Response } from 'express';

import Client from '../models/clientsModel';
import Vet from '../models/vetsModel';

import { StatusCodes, StatusTypes } from '../constants/statusCodes';
import { catchAsyncError } from '../middlewares/catchAsyncError';
import AppError from '../utils/appError';

export const getAllUsers: RequestHandler = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const clients = await Client.find();
  const vets = await Vet.find();

  const users = [...clients, ...vets];

  if (!users) return next(AppError('No users found', StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({
    status: StatusTypes.SUCCESS,
    results: users.length,
    data: {
      vets,
      clients,
    },
  });
});

export const getUser: RequestHandler = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.findById(req.params.id).populate('appointments');
  const vet = await Vet.findById(req.params.id).populate('appointments');

  const user = client ?? vet;

  if (!user) return next(AppError('No user found', StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({
    status: StatusTypes.SUCCESS,
    data: {
      user,
    },
  });
});

export const updateUser: RequestHandler = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(AppError('This route is not for updating password', StatusCodes.BAD_REQUEST));
  }

  const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const vet = await Vet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  const user = client ?? vet;

  if (!user) return next(AppError('No user found to update!', StatusCodes.NOT_FOUND));

  res.status(StatusCodes.OK).json({
    status: StatusTypes.SUCCESS,
    data: {
      user,
    },
  });
});

export const deleteUser: RequestHandler = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const client = await Client.findByIdAndDelete(req.params.id);
  const vet = await Vet.findByIdAndDelete(req.params.id);

  const user = client ?? vet;

  if (!user) return next(AppError('No user found to delete!', StatusCodes.NOT_FOUND));

  res.status(StatusCodes.NO_CONTENT).json({
    status: StatusTypes.SUCCESS,
  });
});
