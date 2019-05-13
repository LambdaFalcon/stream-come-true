const asyncErrorCatch = require('./../utils/asyncErrorCatch');
const ElasticClient = require('./../elasticClient/ElasticClient');

/**
 * Middleware to attach a source to req. Usually mounted after
 * the {@link checkSourceAvailable} middleware, to attach a source if
 * it exists.
 * The source is an ElasticClient instance and it is attached at
 * req.source (or whatever field is configured in the config).
 * To extract it and have code autocompletion use the static
 * method ElasticClient.getInstance.
 *
 * @example
 *    const connectSource = require('./middleware/connectSource');
 *    router.all('/:source*', connectSource(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js middleware
 */
const connectSource = config => asyncErrorCatch(async (req, res, next) => {
  const sourceName = req.params.source;
  req[config.sourceFieldName] = new ElasticClient(sourceName, config);
  next();
});

module.exports = connectSource;
