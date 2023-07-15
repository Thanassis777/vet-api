"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changedPasswordAfter = void 0;
var changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        var changedTimestamp = Math.floor(this.passwordChangedAt / 1000).toString();
        return JWTTimestamp < changedTimestamp;
    }
    return false;
};
exports.changedPasswordAfter = changedPasswordAfter;
