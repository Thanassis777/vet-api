import AppError from '../utils/appError';
import { StatusCodes } from '../constants/statusCodes';
import { UserTypes } from '../constants/userTypes';
import { requiredFields } from '../constants/requiredFields';
import { NextFunction, Request, Response } from 'express';

export const checkForEmptyFields = async (req: Request, res: Response, next: NextFunction) => {
  const updateData = req.body;
  const userType = req.body.userType;

  if (!(userType in UserTypes))
    return next(AppError(`UserType should have one value from: ${Object.values(UserTypes)}`, StatusCodes.BAD_REQUEST));

  // Check if any of required fields are empty
  const fieldsToCheck: string[] = requiredFields[userType];
  const emptyFields = fieldsToCheck.filter((field) => !updateData[field]);

  if (emptyFields.length > 0) {
    return next(
      AppError(`Please provide values for the following fields: ${emptyFields.join(', ')}`, StatusCodes.BAD_REQUEST)
    );
  }

  // res.locals.somevariable = userType; --> send data from middleware to catch up function
  next();
};
