"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointments = exports.setAppointmentClientId = void 0;
var appointmentsModel_1 = require("../models/appointmentsModel");
var factoryHandler_1 = require("./factoryHandler");
var setAppointmentClientId = function (req, res, next) {
    // Allow nested routes
    if (!req.body.client)
        req.body.client = req.params.clientId;
    if (!req.body.vet)
        req.body.vet = req.params.vetId;
    next();
};
exports.setAppointmentClientId = setAppointmentClientId;
exports.getAppointments = (0, factoryHandler_1.getAll)(appointmentsModel_1.Appointment);
exports.createAppointment = (0, factoryHandler_1.createOne)(appointmentsModel_1.Appointment);
exports.updateAppointment = (0, factoryHandler_1.updateOne)(appointmentsModel_1.Appointment);
exports.deleteAppointment = (0, factoryHandler_1.deleteOne)(appointmentsModel_1.Appointment);
