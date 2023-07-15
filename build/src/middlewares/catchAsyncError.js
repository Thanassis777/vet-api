"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncError = void 0;
var catchAsyncError = function (fn) { return function (req, res, next) {
    return fn(req, res, next).catch(next);
}; };
exports.catchAsyncError = catchAsyncError;
