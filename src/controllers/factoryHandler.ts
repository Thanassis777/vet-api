import { catchAsyncError } from '../middlewares/catchAsyncError';
import { Model, PopulateOptions } from 'mongoose';
import { AppointmentSchema } from '../models/appointmentsModel';
import { VetSchema } from '../models/vetsModel';
import { ClientSchema } from '../models/clientsModel';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError';
import { StatusCodes, StatusTypes } from '../constants/statusCodes';

type ModelType = AppointmentSchema | VetSchema | ClientSchema;

export const getAll = <T extends ModelType>(Model: Model<T>) =>
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let currentFilter = {};
    if (res.locals.filterOptions) currentFilter = res.locals.filterOptions;

    const docs = await Model.find(currentFilter);

    if (!docs) return next(AppError('No documents found', StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
      status: StatusTypes.SUCCESS,
      results: docs.length,
      data: docs,
    });
  });

export const getOne = <T extends ModelType>(Model: Model<T>, popOptions?: PopulateOptions) =>
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);

    // @ts-ignore
    if (popOptions) query = query.populate(popOptions);

    const doc = await query;

    if (!doc) return next(AppError('No document found', StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
      status: StatusTypes.SUCCESS,
      data: doc,
    });
  });

export const createOne = <T extends ModelType>(Model: Model<T>) =>
  catchAsyncError(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    newDoc.__v = undefined;

    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });

export const updateOne = <T extends ModelType>(Model: Model<T>) =>
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) return next(AppError('No document with that ID found to update!', StatusCodes.NOT_FOUND));

    res.status(StatusCodes.OK).json({
      status: StatusTypes.SUCCESS,
      data: doc,
    });
  });

export const deleteOne = <T extends ModelType>(Model: Model<T>) =>
  catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) return next(AppError('No document with that ID found to delete!', StatusCodes.NOT_FOUND));

    res.status(StatusCodes.NO_CONTENT).json({
      status: StatusTypes.SUCCESS,
    });
  });
