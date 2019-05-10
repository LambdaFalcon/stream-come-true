const express = require('express');

const addFilters = require('../../middleware/addFilters');
const allData = require('./all');
const itemsOverTime = require('./itemsOverTime');
const popularKeywords = require('./popularKeywords');

const sourceRouter = (config) => {
  const router = express.Router();

  router.all('/*', addFilters);

  router.get('/', allData(config));
  router.get('/items_over_time', itemsOverTime(config));
  router.get('/popular_keywords', popularKeywords(config));

  return router;
};

module.exports = sourceRouter;
