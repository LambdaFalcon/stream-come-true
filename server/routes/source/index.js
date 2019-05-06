const express = require('express');

const addFilters = require('../../middleware/addFilters');
const allData = require('./all');
const itemsOverTime = require('./itemsOverTime');
const popularKeywords = require('./popularKeywords');

const sourceRouter = (_config) => {
  const router = express.Router();

  router.all('/*', addFilters);

  router.get('/', allData);
  router.get('/items_over_time', itemsOverTime);
  router.get('/popular_keywords', popularKeywords);

  return router;
};

module.exports = sourceRouter;
