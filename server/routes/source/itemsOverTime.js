const asyncErrorCatch = require('./../../utils/asyncErrorCatch');
const ElasticClient = require('../../elasticClient/ElasticClient');

/**
 * Router for items over time.
 *
 * This router returns the items over time aggregation from a previously added source.
 * For adding the source, see the {@link connectSource} middleware.
 *
 * This route also handles filters found at req.filters:
 * textfilter: filters data by text search (e.g. "google")
 * timeframe: filters data by time frame (e.g. 5h)
 *
 * @example
 *    const itemsOverTime = require('./itemsOverTime');
 *    router.get('/items_over_time', itemsOverTime(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js route handler
 */
module.exports = config => asyncErrorCatch(async (req, res) => {
  const { filters } = req;
  const client = ElasticClient.getInstance(req, config);
  const items = await client.itemsOverTime(filters);
  res.json(items);
});
