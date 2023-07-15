"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSpecialities = void 0;
var specialities_1 = require("../constants/specialities");
var validateSpecialities = function (values) {
    if (Array.isArray(values) && values.length === 0) {
        throw new Error("Specialities should have at least one value");
    }
    else if (Array.isArray(values) && values.length > Object.keys(specialities_1.Specialities).length) {
        throw new Error("Specialities should have maximum 4 values");
    }
    else if (values.some(function (val) { return values.indexOf(val) !== values.lastIndexOf(val); })) {
        throw new Error("Specialities should not have duplicate");
    }
};
exports.validateSpecialities = validateSpecialities;
