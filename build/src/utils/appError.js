"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var statusCodes_1 = require("../constants/statusCodes");
var AppError = function (message, statusCode) {
    var error = Object.create(Error.prototype);
    error.statusCode = statusCode;
    error.status = "".concat(statusCode).startsWith('4') ? statusCodes_1.StatusTypes.FAIL : statusCodes_1.StatusTypes.ERROR;
    error.isOperational = true;
    error.message = message;
    Error.captureStackTrace(error, AppError);
    return error;
};
exports.default = AppError;
