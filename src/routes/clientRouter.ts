import express from 'express';

import { clientApi } from '../constants/apiUrls';
import { checkForEmptyFields } from '../middlewares/checkForEmptyFields';
import { protectRouter } from '../middlewares/protectRouters';
import {
  deleteClient,
  getAllClients,
  getClient,
  setClientFilter,
  updateClient,
} from '../controllers/clientControllers';
import { checkForPasswordField } from '../middlewares/checkForPasswordField';
import appointmentRouter from './appointmentRouter';
import { resizeUserImages, uploadUserImages } from '../middlewares/photoUploadingMiddleware';

const clientRouter = express.Router();

clientRouter.use(clientApi.NESTED_APPOINTMENT_URL, setClientFilter, appointmentRouter);

clientRouter.route(clientApi.ROOT_URL).get( getAllClients);

clientRouter
  .route(clientApi.IDS_URL)
  .get(protectRouter, getClient)
  .patch(protectRouter, uploadUserImages, resizeUserImages, checkForEmptyFields, checkForPasswordField, updateClient)
  .delete(protectRouter, deleteClient);

export default clientRouter;
