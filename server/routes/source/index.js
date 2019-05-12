const express = require('express');

const addFilters = require('../../middleware/addFilters');
const allData = require('./all');
const itemsOverTime = require('./itemsOverTime');
const popularKeywords = require('./popularKeywords');
const usersOverTime = require('./usersOverTime');
const popularUsers = require('./popularUsers');

/**
 * Create the router for a specific source.
 *
 * This router exposes three main routes:
 * / (root): returns all data collected for the source
 * /items_over_time: returns the items over time aggregation
 * /popular_keywords: returns the popular keywords aggregation
 *
 * All routes also take query parameters:
 * textfilter: filters data by text search (e.g. "google")
 * timeframe: filters data by time frame (e.g. 5h)
 *
 * @example
 *    const sourceRouter = require('./source');
 *    router.use('/:source', sourceRouter(config));
 *
 * @param {object} config server configuration
 * @returns {object} Express.js router
 */
const sourceRouter = (config) => {
  const router = express.Router();

  router.all('/*', addFilters(config));

  router.get('/', allData(config));
  router.get('/items_over_time', itemsOverTime(config));
  router.get('/popular_keywords', popularKeywords(config));
  router.get('/users_over_time', usersOverTime(config));
  router.get('/popular_users', popularUsers(config));

  return router;
};

module.exports = sourceRouter;
