const express = require('express');

const checkSourceAvailable = require('./../middleware/checkSourceAvailable');
const connectSource = require('./../middleware/connectSource');
const sourceRouter = require('./source');

/**
 * Create the router for a stream.
 * This router exposes a parametric route /:source
 * where source can be any string.
 * Only the sources twitter and reddit actually respond.
 *
 * @example
 *    const stream = require('./../routes/stream');
 *    router.use('/', stream(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js router
 */
const streamRouter = (config) => {
  const router = express.Router();

  // middleware to check that source is available
  // and add ElasticClient to req
  router.all('/:source*', checkSourceAvailable(config));
  router.all('/:source*', connectSource(config));

  // mount subroutes
  router.use('/:source', sourceRouter(config));

  return router;
};

module.exports = streamRouter;
