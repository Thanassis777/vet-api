"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var apiUrls_1 = require("../constants/apiUrls");
var protectRouters_1 = require("../middlewares/protectRouters");
var appointmentController_1 = require("../controllers/appointmentController");
var validateVetAndClient_1 = require("../middlewares/validateVetAndClient");
var appointmentRouter = express_1.default.Router({ mergeParams: true });
appointmentRouter
    .route(apiUrls_1.appointmentApi.ROOT_URL)
    .get(protectRouters_1.protectRouter, appointmentController_1.getAppointments)
    .post(protectRouters_1.protectRouter, appointmentController_1.setAppointmentClientId, validateVetAndClient_1.validateVetAndClient, appointmentController_1.createAppointment);
appointmentRouter
    .route(apiUrls_1.appointmentApi.IDS_URL)
    .patch(protectRouters_1.protectRouter, appointmentController_1.updateAppointment)
    .delete(protectRouters_1.protectRouter, appointmentController_1.deleteAppointment);
exports.default = appointmentRouter;
