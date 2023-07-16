"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apiUrls_1 = require("../constants/apiUrls");
var checkForEmptyFields_1 = require("../middlewares/checkForEmptyFields");
var protectRouters_1 = require("../middlewares/protectRouters");
var vetControllers_1 = require("../controllers/vetControllers");
var checkForPasswordField_1 = require("../middlewares/checkForPasswordField");
var appointmentRouter_1 = __importDefault(require("./appointmentRouter"));
var photoUploadingMiddleware_1 = require("../middlewares/photoUploadingMiddleware");
var vetRouter = express_1.default.Router();
vetRouter.use(apiUrls_1.vetApi.NESTED_APPOINTMENT_URL, vetControllers_1.setVetFilter, appointmentRouter_1.default);
vetRouter.route(apiUrls_1.vetApi.ROOT_URL).get(vetControllers_1.getAllVets);
vetRouter
    .route(apiUrls_1.vetApi.IDS_URL)
    .get(protectRouters_1.protectRouter, vetControllers_1.getVet)
    .patch(protectRouters_1.protectRouter, photoUploadingMiddleware_1.uploadUserImages, photoUploadingMiddleware_1.resizeUserImages, checkForEmptyFields_1.checkForEmptyFields, checkForPasswordField_1.checkForPasswordField, vetControllers_1.updateVet)
    .delete(protectRouters_1.protectRouter, vetControllers_1.deleteVet);
exports.default = vetRouter;
