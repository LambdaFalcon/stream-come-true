const debug = require('debug')('server:info');
const createError = require('http-errors');

const asyncErrorCatch = require('../utils/asyncErrorCatch');
const datetimeUtils = require('../utils/datetime');

const validDate = d => !!Date.parse(d);
const fromBeforeTo = (from, to) => new Date(to) - new Date(from) > 0;
const validDateFilters = (from, to) => validDate(from) && validDate(to) && fromBeforeTo(from, to);

/**
 * Middleware to attach filters present in req.query to req.filters.
 * Usually used in the main /:source router to add filters for all
 * /:source subroutes.
 *
 * This will also apply defaults if the filters are not provided.
 *
 * The available filters are:
 * - textfilter:  used to search text fields
 * - timeframe: DEPRECATED
 * - fromdatetime: start of time frame to consider
 * - todatetime: end of time frame to consider
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

  // Destructuring with default assignments
  const {
    textfilter = '',
    timeframe = undefined,
    fromdatetime: candidateFromdatetime,
    todatetime = new Date().toISOString(),
  } = req.query;

  // Set default fromdatetime
  const fromdatetime = candidateFromdatetime
    || datetimeUtils.minusHours(todatetime, config.defaultHourRange);

  // Check validity of date filters
  if (!validDateFilters(fromdatetime, todatetime)) throw createError(400, 'Bad date filters');

  req.filters = {
    textfilter,
    timeframe,
    fromdatetime,
    todatetime,
  };
  next();
});

module.exports = addFilters;
