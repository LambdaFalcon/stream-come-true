const asyncErrorCatch = require('./../../utils/asyncErrorCatch');
const ElasticClient = require('../../elasticClient/ElasticClient');

/**
 * Router for popular users.
 *
 * This router returns the popular users aggregation from a previously added source.
 * For adding the source, see the {@link connectSource} middleware.
 *
 * This route also handles filters found at req.filters:
 * textfilter: filters data by text search (e.g. "google")
 * timeframe: filters data by time frame (e.g. 5h)
 *
 * @example
 *    const popularUsers = require('./popularUsers');
 *    router.get('/popular_keywords', popularUsers(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js route handler
 */
module.exports = config => asyncErrorCatch(async (req, res) => {
  const { filters } = req;
  const client = ElasticClient.getInstance(req, config);
  const items = await client.popularUsers(filters);
  res.json(items);
});
