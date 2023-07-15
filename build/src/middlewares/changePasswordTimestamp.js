"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordTimestamp = void 0;
var changePasswordTimestamp = function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
};
exports.changePasswordTimestamp = changePasswordTimestamp;
