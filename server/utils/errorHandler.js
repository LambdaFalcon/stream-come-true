const debug = require('debug')('server:error');

// eslint-disable-next-line no-unused-vars
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
