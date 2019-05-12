const debug = require('debug')('server:info');
const createError = require('http-errors');

const asyncErrorCatch = require('../utils/asyncErrorCatch');

const validDate = d => !!Date.parse(d);
const fromBeforeTo = (from, to) => new Date(to) - new Date(from) > 0;
const validDateFilters = (from, to) => validDate(from) && validDate(to) && fromBeforeTo(from, to);

/**
 * Subtract a given number of hours from a given date.
 *
 * @param {string} ds a date string
 * @param {number} h a number of hours to subtract
 * @returns {string} a new date string with the hours subtracted
 */
const minusHours = (ds, h) => {
  const d = new Date(ds);
  d.setHours(d.getHours() - h);
  return d.toISOString();
};

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
  const fromdatetime = candidateFromdatetime || minusHours(todatetime, config.defaultHourRange);

  // Check validity of date filters
  if (validDateFilters(fromdatetime)) throw createError(400, 'Bad date filters');

  req.filters = {
    textfilter,
    timeframe,
    fromdatetime,
    todatetime,
  };
  next();
});

module.exports = addFilters;
