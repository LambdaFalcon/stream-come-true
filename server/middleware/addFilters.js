const debug = require('debug')('server:info');

const asyncErrorCatch = require('../utils/asyncErrorCatch');

module.exports = asyncErrorCatch(async (req, _res, next) => {
  debug(`Extracting URL query: ${JSON.stringify(req.query)}`);
  const { textfilter, timeframe } = req.query;
  req.filters = { textfilter, timeframe };
  next();
});
