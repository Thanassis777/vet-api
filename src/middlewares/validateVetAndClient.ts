import { NextFunction, Request, Response } from 'express';
import Client from '../models/clientsModel';
import Vet from '../models/vetsModel';
import AppError from '../utils/appError';
import { StatusCodes } from '../constants/statusCodes';
import { catchAsyncError } from './catchAsyncError';

export const validateVetAndClient = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { vet, client } = req.body;

  if (!vet || !client) return next(AppError(`Please provide a user`, StatusCodes.NOT_FOUND));

  const currentVet = await Vet.findById(vet);
  if (!currentVet) return next(AppError(`Vet with id: ${vet} does not exist`, StatusCodes.NOT_FOUND));

  const currentClient = await Client.findById(client);
  if (!currentClient) return next(AppError(`Client with id: ${client} does not exist`, StatusCodes.NOT_FOUND));

  next();
});
