import Client from '../models/clientsModel';
import { deleteOne, getAll, getOne, updateOne } from './factoryHandler';
import { NextFunction, Request, Response } from 'express';

export const setClientFilter = async (req: Request, res: Response, next: NextFunction) => {
  let filter = {};
  if (req.params.clientId && req.params.clientId !== ':clientId') filter = { client: { _id: req.params.clientId } };

  res.locals.filterOptions = filter;

  next();
};

export const getAllClients = getAll(Client);
export const getClient = getOne(Client, { path: 'appointments' });
export const updateClient = updateOne(Client);
export const deleteClient = deleteOne(Client);
