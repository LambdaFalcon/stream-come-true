const express = require('express');

const stream = require('./../routes/stream');

const api = (config) => {
  const router = express.Router();

  router.use('/', stream(config));

  return router;
};

module.exports = api;
