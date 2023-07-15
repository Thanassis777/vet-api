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
var mongoose_1 = require("mongoose");
var userModel_1 = __importDefault(require("./userModel"));
var attachSchemaMiddleware_1 = require("../middlewares/attachSchemaMiddleware");
var validator_1 = __importDefault(require("validator"));
var removeVirtualId_1 = require("../utils/removeVirtualId");
var clientSchema = new mongoose_1.Schema(__assign(__assign({}, userModel_1.default.obj), { pets: {
        type: [
            {
                name: {
                    type: String,
                    validate: function (value) { return validator_1.default.isAlpha(value); },
                    trim: true,
                },
                age: {
                    type: Number,
                    validate: function (value) { return validator_1.default.isFloat(value.toString(), { gt: 0 }); },
                },
                breed: {
                    type: String,
                    validate: function (value) { return validator_1.default.isAlpha(value); },
                    trim: true,
                },
            },
        ],
        default: [],
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
// virtual populate appointments (not persisted in database,only for query purposes)
clientSchema.virtual('appointments', {
    ref: 'Appointment',
    foreignField: 'client',
    localField: '_id',
    options: { select: '-client' },
});
(0, attachSchemaMiddleware_1.attachSchemaMiddleware)(clientSchema);
exports.default = (0, mongoose_1.model)('Client', clientSchema);
