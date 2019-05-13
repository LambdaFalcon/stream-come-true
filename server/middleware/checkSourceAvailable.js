const createError = require('http-errors');

const asyncErrorCatch = require('./../utils/asyncErrorCatch');

const isValidSource = (sources, sourceName) => !!sources[sourceName];

/**
 * Middleware to check if a source is available. Usually mounted before
 * the {@link connectSource} middleware, to check if the source exists
 * (based on the config).
 *
 * @example
 *    const checkSourceAvailable = require('./middleware/checkSourceAvailable');
 *    router.all('/:source*', checkSourceAvailable(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js middleware
 */
const checkSourceAvailable = config => asyncErrorCatch(async (req, res, next) => {
  const sourceName = req.params.source;

  // Check that source is valid
  if (!isValidSource(config.indices, sourceName)) {
    throw createError(404, `Source ${sourceName} is not available`);
  }

  next();
});

module.exports = checkSourceAvailable;
