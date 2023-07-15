"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vetSchema = void 0;
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var userModel_1 = __importDefault(require("./userModel"));
var specialities_1 = require("../constants/specialities");
var validateSpecialities_1 = require("../utils/validateSpecialities");
var attachSchemaMiddleware_1 = require("../middlewares/attachSchemaMiddleware");
var removeVirtualId_1 = require("../utils/removeVirtualId");
exports.vetSchema = new mongoose_1.Schema(__assign(__assign({}, userModel_1.default.obj), { address: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: function (value) { return validator_1.default.isAlpha(value); },
    }, numberAddress: {
        type: Number,
        required: false,
        min: 1,
        max: 9999,
        validate: function (value) { return validator_1.default.isNumeric(value.toString()); },
    }, region: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: function (value) { return validator_1.default.isAlpha(value); },
    }, state: {
        type: String,
        required: false,
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: function (value) { return validator_1.default.isAlpha(value); },
    }, specialities: {
        type: [String],
        required: false,
        default: undefined,
        enum: Object.values(specialities_1.Specialities),
        validate: function (values) { return (0, validateSpecialities_1.validateSpecialities)(values); },
    } }), {
    toJSON: {
        virtuals: true,
        transform: removeVirtualId_1.removeVirtualId,
    },
    toObject: {
        virtuals: true,
        transform: removeVirtualId_1.removeVirtualId,
    },
});
(0, attachSchemaMiddleware_1.attachSchemaMiddleware)(exports.vetSchema);
// virtual populate appointments (not persisted in database,only for query purposes)
exports.vetSchema.virtual('appointments', {
    ref: 'Appointment',
    foreignField: 'vet',
    localField: '_id',
    options: { select: '-vet' },
});
exports.default = (0, mongoose_1.model)('Vet', exports.vetSchema);
