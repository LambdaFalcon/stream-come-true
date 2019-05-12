const createError = require('http-errors');

const asyncErrorCatch = require('./../utils/asyncErrorCatch');

const isValidSource = (sources, sourceName) => !!sources[sourceName];

const checkSourceAvailable = config => asyncErrorCatch(async (req, res, next) => {
  const sourceName = req.params.source;

  // Check that source is valid
  if (!isValidSource(config.indices, sourceName)) {
    throw createError(404, `Source ${sourceName} is not available`);
  }

  next();
});

module.exports = checkSourceAvailable;
