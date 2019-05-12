const debug = require('debug')('server:info');

const asyncErrorCatch = require('../utils/asyncErrorCatch');

/**
 * Middleware to attach filters present in req.query to req.filters.
 * Usually used in the main /:source router to add filters for all
 * /:source subroutes.
 *
 * @example
 *    const addFilters = require('./middleware/addFilters');
 *    router.all('/*', addFilters(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js middleware
 */
const addFilters = config => asyncErrorCatch(async (req, _res, next) => {
  debug(`Extracting URL query: ${JSON.stringify(req.query)}`);
  const { textfilter, timeframe } = req.query;
  req.filters = { textfilter, timeframe };
  next();
});

module.exports = addFilters;
