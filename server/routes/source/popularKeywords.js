const asyncErrorCatch = require('./../../utils/asyncErrorCatch');
const ElasticClient = require('../../elasticClient/ElasticClient');

module.exports = asyncErrorCatch(async (req, res) => {
  const { filters } = req;
  const client = ElasticClient.getInstance(req);
  const items = await client.popularKeywords(filters);
  res.json(items);
});
