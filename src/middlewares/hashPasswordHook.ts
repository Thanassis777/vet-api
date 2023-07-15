import { NextFunction } from 'express';
import bcrypt from 'bcrypt';

export const hashPasswordHook = async function (next: NextFunction) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
};
