import * as crypto from 'crypto';
export const createPasswordResetToken = function () {
  // token send to user, behaves like a password
  const resetToken = crypto.randomBytes(32).toString('hex');

  //hash token and save it to DB so that we can compare it with user provided token
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 minutes convert in milliseconds

  // send unencrypted token via email
  return resetToken;
};
