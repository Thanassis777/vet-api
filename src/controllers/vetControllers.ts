import Vet from '../models/vetsModel';
import { deleteOne, getAll, getOne, updateOne } from './factoryHandler';
import { NextFunction, Request, Response } from 'express';

// middleware used for getting vet appointment
export const setVetFilter = async (req: Request, res: Response, next: NextFunction) => {
  let filter = {};
  if (req.params.vetId && req.params.vetId !== ':vetId') filter = { vet: { _id: req.params.vetId } };

  res.locals.filterOptions = filter;

  next();
};
export const getAllVets = getAll(Vet);
export const getVet = getOne(Vet, { path: 'appointments' });
export const updateVet = updateOne(Vet);

export const deleteVet = deleteOne(Vet);
