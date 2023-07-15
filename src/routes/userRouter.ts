import express from 'express';

import { userApi } from '../constants/apiUrls';
import { deleteUser, getAllUsers, getUser, updateUser } from '../controllers/usersControllers';
import { checkForEmptyFields } from '../middlewares/checkForEmptyFields';
import { protectRouter } from '../middlewares/protectRouters';
import appointmentRouter from './appointmentRouter';

const userRouter = express.Router();

userRouter.use(userApi.NESTED_APPOINTMENT_URL, appointmentRouter);

userRouter.route(userApi.ROOT_URL).get(protectRouter, getAllUsers);

userRouter
  .route(userApi.IDS_URL)
  .get(protectRouter, getUser)
  .patch(checkForEmptyFields, updateUser)
  .delete(protectRouter, deleteUser);

export default userRouter;
