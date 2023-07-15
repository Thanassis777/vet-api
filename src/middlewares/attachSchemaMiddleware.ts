import { Schema } from 'mongoose';

import { changedPasswordAfter } from '../utils/changedPasswordAfter';
import { correctPassword } from '../utils/correctPassword';

import { changePasswordTimestamp } from './changePasswordTimestamp';
import { hashPasswordHook } from './hashPasswordHook';
import { createPasswordResetToken } from './createPasswordResetToken';
import { resetPasswordChangedTime } from './resetPasswordChangedTime';
import { removeVersionKey } from './removeVersionKey';

export function attachSchemaMiddleware(schema: Schema): void {
  schema.pre('save', resetPasswordChangedTime);
  schema.pre('save', changePasswordTimestamp);
  schema.pre('save', hashPasswordHook);

  schema.pre(/^find/, removeVersionKey);

  schema.methods.correctPassword = correctPassword;
  schema.methods.changedPasswordAfter = changedPasswordAfter;
  schema.methods.createPasswordResetToken = createPasswordResetToken;
}
