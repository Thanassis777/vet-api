import express from 'express';

import { authApi } from '../constants/apiUrls';
import { forgotPassword, loginUser, registerUser, resetPassword, updatePassword } from '../controllers/authController';
import { protectRouter } from '../middlewares/protectRouters';

const authRouter = express.Router();

authRouter.route(authApi.LOGIN_URL).post(loginUser);

authRouter.route(authApi.REGISTER_URL).post(registerUser);

authRouter.route(authApi.FORGOT_PASSWORD_URL).post(forgotPassword);

authRouter.route(authApi.RESET_PASSWORD_URL).patch(resetPassword);

authRouter.route(authApi.UPDATE_MY_PASSWORD).patch(protectRouter, updatePassword);

export default authRouter;
