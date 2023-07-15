"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.forgotPassword = exports.loginUser = exports.registerUser = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var process = __importStar(require("process"));
var crypto = __importStar(require("crypto"));
var appError_1 = __importDefault(require("../utils/appError"));
var catchAsyncError_1 = require("../middlewares/catchAsyncError");
var userTypes_1 = require("../constants/userTypes");
var statusCodes_1 = require("../constants/statusCodes");
var clientsModel_1 = __importDefault(require("../models/clientsModel"));
var vetsModel_1 = __importDefault(require("../models/vetsModel"));
var apiUrls_1 = require("../constants/apiUrls");
var email_1 = require("../utils/email");
var signToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
    });
};
var createSendToken = function (user, statusCode, res) {
    var token = signToken(user._id);
    var cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    if (process.env.NODE_ENV === 'production')
        cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);
    // Remove password, versionKey from output
    user.password = undefined;
    user.__v = undefined;
    res.status(statusCode).json({
        status: 'success',
        token: token,
        data: {
            user: user,
        },
    });
};
exports.registerUser = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userType, newUser, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userType = req.body.userType;
                if (!(userType === userTypes_1.UserTypes.client)) return [3 /*break*/, 2];
                return [4 /*yield*/, clientsModel_1.default.create(req.body)];
            case 1:
                _a = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, vetsModel_1.default.create(req.body)];
            case 3:
                _a = _b.sent();
                _b.label = 4;
            case 4:
                newUser = _a;
                createSendToken(newUser, statusCodes_1.StatusCodes.CREATED, res);
                return [2 /*return*/];
        }
    });
}); });
exports.loginUser = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, client, vet, user, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password)
                    return [2 /*return*/, next((0, appError_1.default)('Please provide email or password', statusCodes_1.StatusCodes.BAD_REQUEST))];
                return [4 /*yield*/, clientsModel_1.default.findOne({ email: email }).select('+password')];
            case 1:
                client = _c.sent();
                return [4 /*yield*/, vetsModel_1.default.findOne({ email: email }).select('+password')];
            case 2:
                vet = _c.sent();
                user = client !== null && client !== void 0 ? client : vet;
                _b = !user;
                if (_b) return [3 /*break*/, 4];
                return [4 /*yield*/, user.correctPassword(password, user.password)];
            case 3:
                _b = !(_c.sent());
                _c.label = 4;
            case 4:
                if (_b)
                    return [2 /*return*/, next((0, appError_1.default)('Incorrect credentials', statusCodes_1.StatusCodes.UNAUTHORIZED))];
                createSendToken(user, statusCodes_1.StatusCodes.OK, res);
                return [2 /*return*/];
        }
    });
}); });
exports.forgotPassword = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var email, client, vet, user, resetToken, resetURL, message, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                return [4 /*yield*/, clientsModel_1.default.findOne({ email: email })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, vetsModel_1.default.findOne({ email: email })];
            case 2:
                vet = _a.sent();
                user = client !== null && client !== void 0 ? client : vet;
                if (!user)
                    return [2 /*return*/, next((0, appError_1.default)('No user with this email address found!', statusCodes_1.StatusCodes.NOT_FOUND))];
                resetToken = user.createPasswordResetToken();
                return [4 /*yield*/, user.save({ validateBeforeSave: false })];
            case 3:
                _a.sent();
                resetURL = "".concat(req.protocol, "://").concat(req.get('host')).concat(apiUrls_1.baseAuthUrl, "/reset-password/").concat(resetToken);
                message = "Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:".concat(resetURL, ".\nIf you didn't forget your password, just ignore this mail");
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 8]);
                return [4 /*yield*/, (0, email_1.sendEmail)({
                        email: user.email,
                        subject: 'Password reset token valid for 10 minutes',
                        message: message,
                    })];
            case 5:
                _a.sent();
                res.status(statusCodes_1.StatusCodes.OK).json({
                    status: statusCodes_1.StatusTypes.SUCCESS,
                    message: 'Token sent to email!',
                });
                return [3 /*break*/, 8];
            case 6:
                error_1 = _a.sent();
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                // persist changes in db in case of error
                return [4 /*yield*/, user.save({ validateBeforeSave: false })];
            case 7:
                // persist changes in db in case of error
                _a.sent();
                return [2 /*return*/, (0, appError_1.default)('There was an error sending the email. Try again later', statusCodes_1.StatusCodes.INTERNAL_SERVER_ERROR)];
            case 8: return [2 /*return*/];
        }
    });
}); });
exports.resetPassword = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var hashedToken, client, vet, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
                return [4 /*yield*/, clientsModel_1.default.findOne({
                        passwordResetToken: hashedToken,
                        passwordResetExpires: { $gt: Date.now() },
                    })];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, vetsModel_1.default.findOne({
                        passwordResetToken: hashedToken,
                        passwordResetExpires: { $gt: Date.now() },
                    })];
            case 2:
                vet = _a.sent();
                user = client !== null && client !== void 0 ? client : vet;
                // If token has not expired, and there is user, set the new password
                if (!user) {
                    return [2 /*return*/, next((0, appError_1.default)('Token is invalid or has expired', statusCodes_1.StatusCodes.BAD_REQUEST))];
                }
                user.password = req.body.password;
                user.passwordConfirm = req.body.passwordConfirm;
                user.passwordResetToken = undefined;
                user.passwordResetExpires = undefined;
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                // Update changedPasswordAt property for the user
                // Log the user in, send JWT
                createSendToken(user, statusCodes_1.StatusCodes.OK, res);
                return [2 /*return*/];
        }
    });
}); });
exports.updatePassword = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var client, vet, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, clientsModel_1.default.findById(req.user.id).select('+password')];
            case 1:
                client = _a.sent();
                return [4 /*yield*/, vetsModel_1.default.findById(req.user.id).select('+password')];
            case 2:
                vet = _a.sent();
                user = client !== null && client !== void 0 ? client : vet;
                return [4 /*yield*/, user.correctPassword(req.body.passwordCurrent, user.password)];
            case 3:
                // Check if POSTed current password is correct
                if (!(_a.sent())) {
                    return [2 /*return*/, next((0, appError_1.default)('Your current password is wrong.', 401))];
                }
                user.password = req.body.password;
                user.passwordConfirm = req.body.passwordConfirm;
                return [4 /*yield*/, user.save()];
            case 4:
                _a.sent();
                // User.findByIdAndUpdate will NOT work as intended!
                // Log user in, send JWT
                createSendToken(user, statusCodes_1.StatusCodes.OK, res);
                return [2 /*return*/];
        }
    });
}); });
