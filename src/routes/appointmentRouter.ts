import express from 'express';

import { appointmentApi } from '../constants/apiUrls';
import { protectRouter } from '../middlewares/protectRouters';
import {
  createAppointment,
  deleteAppointment,
  getAppointments,
  setAppointmentClientId,
  updateAppointment,
} from '../controllers/appointmentController';
import { validateVetAndClient } from '../middlewares/validateVetAndClient';

const appointmentRouter = express.Router({ mergeParams: true });

appointmentRouter
  .route(appointmentApi.ROOT_URL)
  .get(protectRouter, getAppointments)
  .post(protectRouter, setAppointmentClientId, validateVetAndClient, createAppointment);

appointmentRouter
  .route(appointmentApi.IDS_URL)
  .patch(protectRouter, updateAppointment)
  .delete(protectRouter, deleteAppointment);

export default appointmentRouter;
