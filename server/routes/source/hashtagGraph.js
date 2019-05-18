const asyncErrorCatch = require('./../../utils/asyncErrorCatch');
const ElasticClient = require('../../elasticClient/ElasticClient');

/**
 * Router for hashtag graph.
 *
 * This router returns the hashtag graph explore API response from a previously added source.
 * For adding the source, see the {@link connectSource} middleware.
 *
 * This route also handles filters found at req.filters:
 * textfilter: filters data by text search (e.g. "google")
 * timeframe: filters data by time frame (e.g. 5h)
 *
 * @example
 *    const hashtagGraph = require('./hashtagGraph');
 *    router.get('/hashtag_graph', hashtagGraph(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js route handler
 */
module.exports = config => asyncErrorCatch(async (req, res) => {
  const { filters } = req;
  const client = ElasticClient.getInstance(req, config);
  const items = await client.hashtagGraph(filters);
  res.json(items);
});
