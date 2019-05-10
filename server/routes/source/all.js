const asyncErrorCatch = require('./../../utils/asyncErrorCatch');
const ElasticClient = require('../../elasticClient/ElasticClient');

module.exports = config => asyncErrorCatch(async (req, res) => {
  const { filters } = req;
  const client = ElasticClient.getInstance(req, config);
  const items = await client.all(filters);
  res.json(items);
});
