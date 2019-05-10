const express = require('express');

const stream = require('./../routes/stream');

/**
 * Create an API to be used by an express app.
 * @example
 *    const express = require('express');
 *    const app = express();
 *    app.use('/api/v1', api(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js router
 */
const api = (config) => {
  const router = express.Router();

  // mount main router
  router.use('/', stream(config));

  return router;
};

module.exports = api;
