"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apiUrls_1 = require("../constants/apiUrls");
var usersControllers_1 = require("../controllers/usersControllers");
var checkForEmptyFields_1 = require("../middlewares/checkForEmptyFields");
var protectRouters_1 = require("../middlewares/protectRouters");
var appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
var userRouter = express_1.default.Router();
userRouter.use(apiUrls_1.userApi.NESTED_APPOINTMENT_URL, appointmentRouter_1.default);
userRouter.route(apiUrls_1.userApi.ROOT_URL).get(protectRouters_1.protectRouter, usersControllers_1.getAllUsers);
userRouter
    .route(apiUrls_1.userApi.IDS_URL)
    .get(protectRouters_1.protectRouter, usersControllers_1.getUser)
    .patch(checkForEmptyFields_1.checkForEmptyFields, usersControllers_1.updateUser)
    .delete(protectRouters_1.protectRouter, usersControllers_1.deleteUser);
exports.default = userRouter;
