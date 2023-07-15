"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var userTypes_1 = require("../constants/userTypes");
var userSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required.'],
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: function (value) { return validator_1.default.isAlpha(value); },
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required.'],
        trim: true,
        minlength: 2,
        maxlength: 20,
        validate: function (value) { return validator_1.default.isAlpha(value); },
    },
    phone: {
        type: Number,
        required: false,
        validate: function (value) { return validator_1.default.isMobilePhone(value.toString(), 'el-GR'); },
    },
    imageProfile: {
        type: String,
        default: 'default.jpg',
    },
    images: [String],
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: function (value) { return validator_1.default.isEmail(value); },
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: function (value) { return validator_1.default.isStrongPassword(value); },
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: 'Passwords are not the same!',
        },
    },
    userType: {
        type: String,
        required: true,
        enum: Object.keys(userTypes_1.UserTypes),
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
    passwordChangedAt: Number,
    passwordResetToken: String,
    passwordResetExpires: Date,
});
exports.default = userSchema;
