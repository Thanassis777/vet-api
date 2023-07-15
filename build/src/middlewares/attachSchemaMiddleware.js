"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachSchemaMiddleware = void 0;
var changedPasswordAfter_1 = require("../utils/changedPasswordAfter");
var correctPassword_1 = require("../utils/correctPassword");
var changePasswordTimestamp_1 = require("./changePasswordTimestamp");
var hashPasswordHook_1 = require("./hashPasswordHook");
var createPasswordResetToken_1 = require("./createPasswordResetToken");
var resetPasswordChangedTime_1 = require("./resetPasswordChangedTime");
var removeVersionKey_1 = require("./removeVersionKey");
function attachSchemaMiddleware(schema) {
    schema.pre('save', resetPasswordChangedTime_1.resetPasswordChangedTime);
    schema.pre('save', changePasswordTimestamp_1.changePasswordTimestamp);
    schema.pre('save', hashPasswordHook_1.hashPasswordHook);
    schema.pre(/^find/, removeVersionKey_1.removeVersionKey);
    schema.methods.correctPassword = correctPassword_1.correctPassword;
    schema.methods.changedPasswordAfter = changedPasswordAfter_1.changedPasswordAfter;
    schema.methods.createPasswordResetToken = createPasswordResetToken_1.createPasswordResetToken;
}
exports.attachSchemaMiddleware = attachSchemaMiddleware;
