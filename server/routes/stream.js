const express = require('express');

const asyncErrorCatch = require('./../utils/asyncErrorCatch');
const connectSource = require('./../middleware/connectSource');
const ElasticClient = require('../elasticClient/ElasticClient');

const allData = asyncErrorCatch(async (req, res) => {
  const client = ElasticClient.getInstance(req);
  const items = await client.all();
  res.send(items);
});

const streamRouter = (config) => {
  const router = express.Router();
  router.all('/:source*', connectSource(config));

  router.get('/:source', allData);

  return router;
};

module.exports = streamRouter;
