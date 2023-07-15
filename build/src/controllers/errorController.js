"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
var appError_1 = __importDefault(require("../utils/appError"));
var statusCodes_1 = require("../constants/statusCodes");
var handleCastErrorDB = function (err) {
    var message = "Invalid ".concat(err.path, ": ").concat(err.value, ".");
    return (0, appError_1.default)(message, statusCodes_1.StatusCodes.BAD_REQUEST);
};
var handleDuplicateFieldsDB = function (err) {
    var value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    var message = "Duplicate field value: ".concat(value, ". Please use another value!");
    return (0, appError_1.default)(message, statusCodes_1.StatusCodes.BAD_REQUEST);
};
var handleValidationErrorDB = function (err) {
    var errors = Object.values(err.errors).map(function (el) { return el.message; });
    var message = "Invalid input data. ".concat(errors.join('. '));
    return (0, appError_1.default)(message, statusCodes_1.StatusCodes.BAD_REQUEST);
};
var handleJWTError = function () { return (0, appError_1.default)('Invalid token. Please log in again!', statusCodes_1.StatusCodes.UNAUTHORIZED); };
var handleJWTExpiredError = function () { return (0, appError_1.default)('Your token has expired! Please log in again.', statusCodes_1.StatusCodes.UNAUTHORIZED); };
var sendErrorDev = function (err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
var sendErrorProd = function (err, res) {
    // Operational, trusted error: send message to client
    err.isOperational
        ? res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        })
        : // Programming or other unknown error: don't leak error details
            // Send generic message
            res.status(statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                status: statusCodes_1.StatusTypes.ERROR,
                message: 'Something went very wrong!',
            });
};
var globalErrorHandler = function (err, req, res, next) {
    err.statusCode = err.statusCode || statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR;
    err.status = err.status || statusCodes_1.StatusTypes.ERROR;
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    }
    else if (process.env.NODE_ENV === 'production') {
        if (err.name === 'CastError')
            err = handleCastErrorDB(err);
        else if (err.code === 11000)
            err = handleDuplicateFieldsDB(err);
        else if (err.name === 'ValidationError')
            err = handleValidationErrorDB(err);
        else if (err.name === 'JsonWebTokenError')
            err = handleJWTError();
        else if (err.name === 'TokenExpiredError')
            err = handleJWTExpiredError();
        sendErrorProd(err, res);
    }
};
exports.globalErrorHandler = globalErrorHandler;
