import { NextFunction } from 'express';

export const resetPasswordChangedTime = function (next: NextFunction) {
  if (!this.isModified('password') || this.isNew) return next();
  // Removing 1 second because the token is created slightly before it is stored in the database!
  this.passwordChangedAt = Date.now() - 1000;
  next();
};
