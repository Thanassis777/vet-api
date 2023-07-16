import express from 'express';

import { vetApi } from '../constants/apiUrls';
import { checkForEmptyFields } from '../middlewares/checkForEmptyFields';
import { protectRouter } from '../middlewares/protectRouters';
import { deleteVet, getAllVets, getVet, setVetFilter, updateVet } from '../controllers/vetControllers';
import { checkForPasswordField } from '../middlewares/checkForPasswordField';
import appointmentRouter from './appointmentRouter';
import { resizeUserImages, uploadUserImages } from '../middlewares/photoUploadingMiddleware';

const vetRouter = express.Router();

vetRouter.use(vetApi.NESTED_APPOINTMENT_URL, setVetFilter, appointmentRouter);

vetRouter.route(vetApi.ROOT_URL).get(getAllVets);

vetRouter
  .route(vetApi.IDS_URL)
  .get(protectRouter, getVet)
  .patch(protectRouter, uploadUserImages, resizeUserImages, checkForEmptyFields, checkForPasswordField, updateVet)
  .delete(protectRouter, deleteVet);

export default vetRouter;
