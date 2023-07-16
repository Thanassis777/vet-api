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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var helmet_1 = __importDefault(require("helmet"));
var express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
var xss_clean_1 = __importDefault(require("xss-clean"));
var compression_1 = __importDefault(require("compression"));
var apiUrls_1 = require("./constants/apiUrls");
var appError_1 = __importDefault(require("./utils/appError"));
var errorController_1 = require("./controllers/errorController");
var statusCodes_1 = require("./constants/statusCodes");
var userRouter_1 = __importDefault(require("./routes/userRouter"));
var authRouter_1 = __importDefault(require("./routes/authRouter"));
var appointmentRouter_1 = __importDefault(require("./routes/appointmentRouter"));
var vetRouter_1 = __importDefault(require("./routes/vetRouter"));
var clientRouter_1 = __importDefault(require("./routes/clientRouter"));
var path = __importStar(require("path"));
var app = (0, express_1.default)();
app.use(express_1.default.static(path.join(__dirname, 'public')));
// Set security HTTP headers
app.use((0, helmet_1.default)());
var limiter = (0, express_rate_limit_1.default)({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in one hour!',
});
/* Security Middlewares */
// limit requests from same APIK
app.use(process.env.BASE_URL, limiter);
// data sanitization from NoSQL query injection
app.use((0, express_mongo_sanitize_1.default)());
// data sanitization against XSS (prevent malicious html code)
app.use((0, xss_clean_1.default)());
/* Body parser, reading data from body into req.body */
app.use(express_1.default.json({ limit: '10kb' }));
app.use(apiUrls_1.userApi.BASE_URL, userRouter_1.default);
app.use(apiUrls_1.vetApi.BASE_URL, vetRouter_1.default);
app.use(apiUrls_1.clientApi.BASE_URL, clientRouter_1.default);
app.use(apiUrls_1.authApi.BASE_URL, authRouter_1.default);
app.use(apiUrls_1.appointmentApi.BASE_URL, appointmentRouter_1.default);
app.use((0, compression_1.default)());
app.all('*', function (req, res, next) {
    next((0, appError_1.default)("Can't find ".concat(req.originalUrl, " on this server!"), statusCodes_1.StatusCodes.NOT_FOUND));
});
app.use(errorController_1.globalErrorHandler);
exports.default = app;
