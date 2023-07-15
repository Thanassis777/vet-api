export const removeVersionKey = function (next) {
  this.select('-__v');

  next();
};
