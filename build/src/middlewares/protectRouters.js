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
exports.protectRouter = void 0;
var process = __importStar(require("process"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var catchAsyncError_1 = require("./catchAsyncError");
var statusCodes_1 = require("../constants/statusCodes");
var appError_1 = __importDefault(require("../utils/appError"));
var clientsModel_1 = __importDefault(require("../models/clientsModel"));
var vetsModel_1 = __importDefault(require("../models/vetsModel"));
exports.protectRouter = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var token;
    var _a;
    return __generator(this, function (_b) {
        token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return [2 /*return*/, next((0, appError_1.default)('You are not logged in! Please log in to get access.', statusCodes_1.StatusCodes.UNAUTHORIZED))];
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, decoded) { return __awaiter(void 0, void 0, void 0, function () {
            var currentClient, currentVet, currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        return [2 /*return*/, next((0, appError_1.default)('Invalid signature!', statusCodes_1.StatusCodes.UNAUTHORIZED))];
                    case 1: return [4 /*yield*/, clientsModel_1.default.findById(decoded.id)];
                    case 2:
                        currentClient = _a.sent();
                        return [4 /*yield*/, vetsModel_1.default.findById(decoded.id)];
                    case 3:
                        currentVet = _a.sent();
                        currentUser = currentClient !== null && currentClient !== void 0 ? currentClient : currentVet;
                        if (!currentUser) {
                            return [2 /*return*/, next((0, appError_1.default)('The user belonging to this token does no longer exist.', statusCodes_1.StatusCodes.UNAUTHORIZED))];
                        }
                        if (currentUser.changedPasswordAfter(decoded.iat.toString())) {
                            return [2 /*return*/, next((0, appError_1.default)('User recently changed password! Please log in again.', statusCodes_1.StatusCodes.UNAUTHORIZED))];
                        }
                        req.user = currentUser;
                        next();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/];
    });
}); });
