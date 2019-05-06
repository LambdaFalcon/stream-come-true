const express = require('express');

const connectSource = require('./../middleware/connectSource');

const sourceRouter = require('./source');

const streamRouter = (config) => {
  const router = express.Router();
  router.all('/:source*', connectSource(config));

  router.use('/:source', sourceRouter(config));

  return router;
};

module.exports = streamRouter;
