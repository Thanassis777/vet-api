"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var mongoose_1 = __importDefault(require("mongoose"));
var app_1 = __importDefault(require("./app"));
process.on('uncaughtException', function (err) {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    process.exit(1);
});
dotenv_1.default.config({ path: './.env' });
var DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose_1.default.connect(DB).then(function () { return console.log('DB connection successful!'); });
var port = process.env.PORT || 3000;
var server = app_1.default.listen(port, function () {
    console.log('Application started on port: ', port);
});
process.on('unhandledRejection', function (err) {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    server.close(function () {
        process.exit(1);
    });
});
