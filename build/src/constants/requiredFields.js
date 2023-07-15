"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.requiredFields = void 0;
var userTypes_1 = require("./userTypes");
exports.requiredFields = (_a = {},
    _a[userTypes_1.UserTypes.vet] = ['address', 'numberAddress', 'region'],
    _a[userTypes_1.UserTypes.client] = ['phone'],
    _a);
