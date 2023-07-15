"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeVersionKey = void 0;
var removeVersionKey = function (next) {
    this.select('-__v');
    next();
};
exports.removeVersionKey = removeVersionKey;
