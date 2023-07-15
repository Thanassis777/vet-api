"use strict";
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
exports.deleteOne = exports.updateOne = exports.createOne = exports.getOne = exports.getAll = void 0;
var catchAsyncError_1 = require("../middlewares/catchAsyncError");
var appError_1 = __importDefault(require("../utils/appError"));
var statusCodes_1 = require("../constants/statusCodes");
var getAll = function (Model) {
    return (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var currentFilter, docs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    currentFilter = {};
                    if (res.locals.filterOptions)
                        currentFilter = res.locals.filterOptions;
                    return [4 /*yield*/, Model.find(currentFilter)];
                case 1:
                    docs = _a.sent();
                    if (!docs)
                        return [2 /*return*/, next((0, appError_1.default)('No documents found', statusCodes_1.StatusCodes.NOT_FOUND))];
                    res.status(statusCodes_1.StatusCodes.OK).json({
                        status: statusCodes_1.StatusTypes.SUCCESS,
                        results: docs.length,
                        data: docs,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.getAll = getAll;
var getOne = function (Model, popOptions) {
    return (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var query, doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    query = Model.findById(req.params.id);
                    // @ts-ignore
                    if (popOptions)
                        query = query.populate(popOptions);
                    return [4 /*yield*/, query];
                case 1:
                    doc = _a.sent();
                    if (!doc)
                        return [2 /*return*/, next((0, appError_1.default)('No document found', statusCodes_1.StatusCodes.NOT_FOUND))];
                    res.status(statusCodes_1.StatusCodes.OK).json({
                        status: statusCodes_1.StatusTypes.SUCCESS,
                        data: doc,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.getOne = getOne;
var createOne = function (Model) {
    return (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var newDoc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Model.create(req.body)];
                case 1:
                    newDoc = _a.sent();
                    newDoc.__v = undefined;
                    res.status(201).json({
                        status: 'success',
                        data: newDoc,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.createOne = createOne;
var updateOne = function (Model) {
    return (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Model.findByIdAndUpdate(req.params.id, req.body, {
                        new: true,
                        runValidators: true,
                    })];
                case 1:
                    doc = _a.sent();
                    if (!doc)
                        return [2 /*return*/, next((0, appError_1.default)('No document with that ID found to update!', statusCodes_1.StatusCodes.NOT_FOUND))];
                    res.status(statusCodes_1.StatusCodes.OK).json({
                        status: statusCodes_1.StatusTypes.SUCCESS,
                        data: doc,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.updateOne = updateOne;
var deleteOne = function (Model) {
    return (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Model.findByIdAndDelete(req.params.id)];
                case 1:
                    doc = _a.sent();
                    if (!doc)
                        return [2 /*return*/, next((0, appError_1.default)('No document with that ID found to delete!', statusCodes_1.StatusCodes.NOT_FOUND))];
                    res.status(statusCodes_1.StatusCodes.NO_CONTENT).json({
                        status: statusCodes_1.StatusTypes.SUCCESS,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.deleteOne = deleteOne;
