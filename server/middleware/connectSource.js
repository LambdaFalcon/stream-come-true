const asyncErrorCatch = require('./../utils/asyncErrorCatch');
const ElasticClient = require('./../elasticClient/ElasticClient');

const connectSource = config => asyncErrorCatch(async (req, res, next) => {
  const sourceName = req.params.source;
  req[config.sourceFieldName] = new ElasticClient(sourceName, config);
  next();
});

module.exports = connectSource;
