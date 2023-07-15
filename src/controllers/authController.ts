import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as process from 'process';
import * as crypto from 'crypto';

import AppError from '../utils/appError';
import { catchAsyncError } from '../middlewares/catchAsyncError';

import { UserTypes } from '../constants/userTypes';
import { StatusCodes, StatusTypes } from '../constants/statusCodes';

import Client, { ClientSchema } from '../models/clientsModel';
import Vet, { VetSchema } from '../models/vetsModel';
import { baseAuthUrl } from '../constants/apiUrls';
import { sendEmail } from '../utils/email';

interface UserRequest extends Request {
  user: {
    id: string;
  };
}

interface CookieOptions {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
}

const signToken = (id: string) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_SECRET_EXPIRES_IN,
  });

const createSendToken = (user: VetSchema | ClientSchema, statusCode: number, res: Response) => {
  const token = signToken(user._id);

  const cookieOptions: CookieOptions = {
    expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password, versionKey from output
  user.password = undefined;
  user.__v = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const registerUser: RequestHandler = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const userType = req.body.userType;
  const newUser = userType === UserTypes.client ? await Client.create(req.body) : await Vet.create(req.body);

  createSendToken(newUser, StatusCodes.CREATED, res);
});

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) return next(AppError('Please provide email or password', StatusCodes.BAD_REQUEST));

  // enforce to select password, as it is set { select:false } in our user schema
  const client = await Client.findOne({ email }).select('+password');
  const vet = await Vet.findOne({ email }).select('+password');

  const user = client ?? vet;

  if (!user || !(await user.correctPassword(password, user.password)))
    return next(AppError('Incorrect credentials', StatusCodes.UNAUTHORIZED));

  createSendToken(user, StatusCodes.OK, res);
});

export const forgotPassword = catchAsyncError(
  async (req: Request<{ email: string }>, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const client = await Client.findOne({ email });
    const vet = await Vet.findOne({ email });

    const user = client ?? vet;
    if (!user) return next(AppError('No user with this email address found!', StatusCodes.NOT_FOUND));

    // generate random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}${baseAuthUrl}/reset-password/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to:${resetURL}.\nIf you didn't forget your password, just ignore this mail`;

    // use try-catch so that we implement more than setting error message
    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token valid for 10 minutes',
        message,
      });

      res.status(StatusCodes.OK).json({
        status: StatusTypes.SUCCESS,
        message: 'Token sent to email!',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      // persist changes in db in case of error
      await user.save({ validateBeforeSave: false });
      return AppError('There was an error sending the email. Try again later', StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
);

export const resetPassword = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  // Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const client = await Client.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  const vet = await Vet.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  const user = client ?? vet;

  // If token has not expired, and there is user, set the new password
  if (!user) {
    return next(AppError('Token is invalid or has expired', StatusCodes.BAD_REQUEST));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Update changedPasswordAt property for the user
  // Log the user in, send JWT
  createSendToken(user, StatusCodes.OK, res);
});

export const updatePassword = catchAsyncError(async (req: UserRequest, res: Response, next: NextFunction) => {
  const client = await Client.findById(req.user.id).select('+password');
  const vet = await Vet.findById(req.user.id).select('+password');

  const user = client ?? vet;
  // Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(AppError('Your current password is wrong.', 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // User.findByIdAndUpdate will NOT work as intended!
  // Log user in, send JWT
  createSendToken(user, StatusCodes.OK, res);
});
