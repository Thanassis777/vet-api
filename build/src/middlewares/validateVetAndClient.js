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
exports.validateVetAndClient = void 0;
var clientsModel_1 = __importDefault(require("../models/clientsModel"));
var vetsModel_1 = __importDefault(require("../models/vetsModel"));
var appError_1 = __importDefault(require("../utils/appError"));
var statusCodes_1 = require("../constants/statusCodes");
var catchAsyncError_1 = require("./catchAsyncError");
exports.validateVetAndClient = (0, catchAsyncError_1.catchAsyncError)(function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, vet, client, currentVet, currentClient;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, vet = _a.vet, client = _a.client;
                if (!vet || !client)
                    return [2 /*return*/, next((0, appError_1.default)("Please provide a user", statusCodes_1.StatusCodes.NOT_FOUND))];
                return [4 /*yield*/, vetsModel_1.default.findById(vet)];
            case 1:
                currentVet = _b.sent();
                if (!currentVet)
                    return [2 /*return*/, next((0, appError_1.default)("Vet with id: ".concat(vet, " does not exist"), statusCodes_1.StatusCodes.NOT_FOUND))];
                return [4 /*yield*/, clientsModel_1.default.findById(client)];
            case 2:
                currentClient = _b.sent();
                if (!currentClient)
                    return [2 /*return*/, next((0, appError_1.default)("Client with id: ".concat(client, " does not exist"), statusCodes_1.StatusCodes.NOT_FOUND))];
                next();
                return [2 /*return*/];
        }
    });
}); });
