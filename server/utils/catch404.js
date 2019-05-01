const createError = require('http-errors');

const catch404 = (req, res, next) => {
  // pass control to next handler
  next(createError(404));
};

module.exports = catch404;
