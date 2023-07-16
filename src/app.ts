import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import comression from 'compression';

import { appointmentApi, authApi, clientApi, userApi, vetApi } from './constants/apiUrls';
import AppError from './utils/appError';
import { globalErrorHandler } from './controllers/errorController';
import { StatusCodes } from './constants/statusCodes';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import appointmentRouter from './routes/appointmentRouter';
import vetRouter from './routes/vetRouter';
import clientRouter from './routes/clientRouter';
import * as path from "path";

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
  max: 100, // 100 allowed requests
  windowMs: 60 * 60 * 1000, // 1 hour limit
  message: 'Too many requests from this IP, please try again in one hour!',
});

/* Security Middlewares */

// limit requests from same APIK
app.use(process.env.BASE_URL, limiter);

// data sanitization from NoSQL query injection
app.use(mongoSanitize());

// data sanitization against XSS (prevent malicious html code)
app.use(xss());

/* Body parser, reading data from body into req.body */
app.use(express.json({ limit: '10kb' }));

app.use(userApi.BASE_URL, userRouter);
app.use(vetApi.BASE_URL, vetRouter);
app.use(clientApi.BASE_URL, clientRouter);
app.use(authApi.BASE_URL, authRouter);
app.use(appointmentApi.BASE_URL, appointmentRouter);

app.use(comression());

app.all('*', (req, res, next) => {
  next(AppError(`Can't find ${req.originalUrl} on this server!`, StatusCodes.NOT_FOUND));
});

app.use(globalErrorHandler);

export default app;
