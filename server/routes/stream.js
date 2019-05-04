const express = require('express');

const connectSource = require('./../middleware/connectSource');

const streamRouter = (config) => {
  const router = express.Router();
  router.all('/:source*', connectSource(config));

  router.get('/:source', (req, res) => res.send(req.source.toString()));

  return router;
};

module.exports = streamRouter;
