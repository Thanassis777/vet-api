import { NextFunction, Request, Response } from 'express';
import { Appointment } from '../models/appointmentsModel';
import { createOne, deleteOne, getAll, updateOne } from './factoryHandler';

export const setAppointmentClientId = (req: Request, res: Response, next: NextFunction) => {
  // Allow nested routes
  if (!req.body.client) req.body.client = req.params.clientId;
  if (!req.body.vet) req.body.vet = req.params.vetId;
  next();
};

export const getAppointments = getAll(Appointment);

export const createAppointment = createOne(Appointment);

export const updateAppointment = updateOne(Appointment);
export const deleteAppointment = deleteOne(Appointment);
