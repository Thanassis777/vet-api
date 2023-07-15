"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apiUrls_1 = require("../constants/apiUrls");
var checkForEmptyFields_1 = require("../middlewares/checkForEmptyFields");
var protectRouters_1 = require("../middlewares/protectRouters");
var clientControllers_1 = require("../controllers/clientControllers");
var checkForPasswordField_1 = require("../middlewares/checkForPasswordField");
var appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
var photoUploadingMiddleware_1 = require("../middlewares/photoUploadingMiddleware");
var clientRouter = express_1.default.Router();
clientRouter.use(apiUrls_1.clientApi.NESTED_APPOINTMENT_URL, clientControllers_1.setClientFilter, appointmentRouter_1.default);
clientRouter.route(apiUrls_1.clientApi.ROOT_URL).get(protectRouters_1.protectRouter, clientControllers_1.getAllClients);
clientRouter
    .route(apiUrls_1.clientApi.IDS_URL)
    .get(protectRouters_1.protectRouter, clientControllers_1.getClient)
    .patch(protectRouters_1.protectRouter, photoUploadingMiddleware_1.uploadUserImages, photoUploadingMiddleware_1.resizeUserImages, checkForEmptyFields_1.checkForEmptyFields, checkForPasswordField_1.checkForPasswordField, clientControllers_1.updateClient)
    .delete(protectRouters_1.protectRouter, clientControllers_1.deleteClient);
exports.default = clientRouter;
