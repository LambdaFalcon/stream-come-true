const debug = require('debug')('server:error');

/**
 * Error handling middleware.
 * This is called whenever a route handler calls next(err) by passing
 * an error.
 * Log 500 errors, responds with error page if the request has not been
 * responded to yet.
 * In development mode, the error page will also show the stack trace.
 *
 * @example
 *    const errorHandler = require('./utils/errorHandler');
 *    // at the end of app.js
 *    app.use(errorHandler);
 */
const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;

  // log error
  if (status >= 500) {
    debug(`error=${err.name}, route=${req.url}, time=${Date.now()}`);
  }

  // use default Express error handler if response already sent
  if (res.headersSent) {
    return next(err);
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(status);
  return res.render('error');
};

module.exports = errorHandler;
