"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apiUrls_1 = require("../constants/apiUrls");
var authController_1 = require("../controllers/authController");
var protectRouters_1 = require("../middlewares/protectRouters");
var authRouter = express_1.default.Router();
authRouter.route(apiUrls_1.authApi.LOGIN_URL).post(authController_1.loginUser);
authRouter.route(apiUrls_1.authApi.REGISTER_URL).post(authController_1.registerUser);
authRouter.route(apiUrls_1.authApi.FORGOT_PASSWORD_URL).post(authController_1.forgotPassword);
authRouter.route(apiUrls_1.authApi.RESET_PASSWORD_URL).patch(authController_1.resetPassword);
authRouter.route(apiUrls_1.authApi.UPDATE_MY_PASSWORD).patch(protectRouters_1.protectRouter, authController_1.updatePassword);
exports.default = authRouter;
