"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentApi = exports.authApi = exports.clientApi = exports.vetApi = exports.userApi = exports.baseAppointmentUrl = exports.baseAuthUrl = exports.baseClientsUrl = exports.baseVetsUrl = exports.baseUsersUrl = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
var BASE_URL = process.env.BASE_URL;
exports.baseUsersUrl = "".concat(BASE_URL, "/users");
exports.baseVetsUrl = "".concat(BASE_URL, "/vets");
exports.baseClientsUrl = "".concat(BASE_URL, "/clients");
exports.baseAuthUrl = "".concat(BASE_URL, "/auth");
exports.baseAppointmentUrl = "".concat(BASE_URL, "/appointments");
exports.userApi = {
    BASE_URL: exports.baseUsersUrl,
    ROOT_URL: '/',
    IDS_URL: '/:id',
    NESTED_APPOINTMENT_URL: '/:clientId/:vetId/appointments',
};
exports.vetApi = {
    BASE_URL: exports.baseVetsUrl,
    ROOT_URL: '/',
    IDS_URL: '/:id',
    NESTED_APPOINTMENT_URL: '/:vetId/appointments',
};
exports.clientApi = {
    BASE_URL: exports.baseClientsUrl,
    ROOT_URL: '/',
    IDS_URL: '/:id',
    NESTED_APPOINTMENT_URL: '/:clientId/appointments',
};
exports.authApi = {
    BASE_URL: exports.baseAuthUrl,
    LOGIN_URL: "/login",
    REGISTER_URL: "/register",
    FORGOT_PASSWORD_URL: "/forgot-password",
    RESET_PASSWORD_URL: "/reset-password/:token",
    UPDATE_MY_PASSWORD: "/updateMyPassword",
};
exports.appointmentApi = {
    BASE_URL: exports.baseAppointmentUrl,
    ROOT_URL: '/',
    IDS_URL: '/:id',
};
