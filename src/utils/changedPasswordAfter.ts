export const changedPasswordAfter = function (JWTTimestamp: string) {
    if (this.passwordChangedAt) {
      const changedTimestamp = Math.floor(this.passwordChangedAt / 1000).toString();
      return JWTTimestamp < changedTimestamp;
    }
  
    return false;
  };