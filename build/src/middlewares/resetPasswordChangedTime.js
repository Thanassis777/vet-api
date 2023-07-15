"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordChangedTime = void 0;
var resetPasswordChangedTime = function (next) {
    if (!this.isModified('password') || this.isNew)
        return next();
    // Removing 1 second because the token is created slightly before it is stored in the database!
    this.passwordChangedAt = Date.now() - 1000;
    next();
};
exports.resetPasswordChangedTime = resetPasswordChangedTime;
