const createError = require('http-errors');

/**
 * Middleware to catch all 404 errors. Use it by attaching it as the last middeware.
 * If no previous route matches, this one will match and automatically forward a 404
 * error to the error handling middleware.
 *
 * @example
 *    const catch404 = require('./utils/catch404');
 *    // attach all routers to app, then as last:
 *    app.use(catch404);
 */
const catch404 = (req, res, next) => {
  next(createError(404));
};

module.exports = catch404;
