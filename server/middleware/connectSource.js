const createError = require('http-errors');

const asyncErrorCatch = require('./../utils/asyncErrorCatch');
const ElasticClient = require('./../elasticClient/ElasticClient');

const isValidSource = (sources, sourceName) => !!sources[sourceName];

const connectSource = config => asyncErrorCatch(async (req, res, next) => {
  const sourceName = req.params.source;

  // Check that source is valid
  if (!isValidSource(config.indices, sourceName)) {
    throw createError(404, `Source ${sourceName} is not available`);
  }

  req.source = new ElasticClient(sourceName, config);
  next();
});

module.exports = connectSource;
