/* eslint-disable no-underscore-dangle */ // _source is in all query results

const { Client } = require('@elastic/elasticsearch');
const createError = require('http-errors');

// TODO: somehow pass this as an argument. Problem: it is used in a static method.
const { sourceFieldName } = require('../config');
const applyFiltersImpl = require('./filters');
const computeIntervalImpl = require('./computeInterval');
const selectFields = require('./selectFields');

const timeBucketing = require('./queries/timeBucketing');
const significantText = require('./queries/significantText');

/**
 * @class ElasticClient
 */
class ElasticClient {
  constructor(sourceName, config) {
    this.url = config.elasticURL;
    this.index = config.indices[sourceName];
    this.client = new Client({ node: this.url });
    this.queryFields = config.queryFields;
    this.config = config;
  }

  /**
   * Extract the client from the Express request.
   * This is necessary to make the type available for VSCode.
   *
   * @param {Express.Request} req Express.js request object
   * @returns {ElasticClient} the connected client
   */
  static getInstance(req) {
    return req[sourceFieldName];
  }

  /**
   * Get all items from the index with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<Item>>}
   */
  async all(filters) {
    const query = this.applyFilters(filters);

    const { dateField, textField } = this.queryFields;
    const sortByDate = { [dateField]: { order: 'desc' } };
    const highlight = { fields: { [textField]: {} }, number_of_fragments: 0 };

    return this.client
      .search({
        index: this.index,
        body: {
          ...query,
          sort: [sortByDate],
          highlight,
        },
        size: 15,
      })
      .then(res => res.body.hits.hits)
      .then(hits => hits.map(el => el._source))
      .then(items => items.map(selectFields.all));
  }

  /**
   * Get the items over time aggregation with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<ItemsOverTimeElement>>} items over time
   */
  async itemsOverTime(filters) {
    const aggName = 'items_over_time';
    const query = this.applyFilters(filters);
    const queryWithAgg = {
      ...query,
      ...timeBucketing(aggName, this.queryFields.dateField, this.computeInterval(filters)),
    };
    const resultExtractor = aggResult => aggResult.buckets.map(selectFields.itemsOverTime);

    return this.aggregation(queryWithAgg, aggName, resultExtractor);
  }

  /**
   * Get the users count over time aggregation with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<UsersOverTimeElement>>} users over time
   */
  async usersOverTime(filters) {
    return [this.index, filters]; // TODO: real implementation
  }

  /**
   * Get the popular keywords aggregation with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<PopularKeyword>>} popular keywords
   */
  async popularKeywords(filters) {
    const aggName = 'popular_keywords';
    const query = this.applyFilters(filters);
    const queryWithAgg = {
      ...query,
      ...significantText(aggName, this.queryFields.textField),
    };
    const resultExtractor = aggResult => aggResult.buckets.map(selectFields.popularKeywords);

    return this.aggregation(queryWithAgg, aggName, resultExtractor);
  }

  /**
   * Get the popular users aggregation with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<PopularUser>>} popular users
   */
  async popularUsers(filters) {
    return [this.index, filters]; // TODO: real implementation
  }

  /**
   * Create simple query with filters applied.
   * The default for the time frame filter is '5h'.
   *
   * @private
   * @param {Filters} filters text and time frame filters
   * @returns {object} ElasticSearch query with filters applied
   */
  applyFilters(filters) {
    return applyFiltersImpl(this.config)(
      filters,
      this.queryFields.dateField,
      this.queryFields.textField,
    );
  }

  /**
   * Computes a reasonable interval given a time frame.
   *
   * @param {Filters} filters text and time frame filters
   */
  computeInterval(filters) {
    const timeframe = (filters && filters.timeframe) || this.config.defaultTimeFrameFilter;
    return computeIntervalImpl(timeframe);
  }

  /**
   * Send an aggregation search query the ElasticSearch instance and get a result.
   * This is a private method used internally
   *
   * @typedef AggItem
   * @type {ItemsOverTimeElement | UsersOverTimeElement | PopularKeyword | PopularUser}
   *
   * @function AggResultExtractor
   * @param {Object} result aggregation result
   * @returns {Array<AggItem>}
   *
   * @private
   * @param {Object} query
   * @param {AggResultExtractor} resultExtractor
   * @returns {Promise<Array<AggItem>>}
   */
  async aggregation(query, aggName, resultExtractor) {
    if (!query.aggs[aggName]) throw createError(500, `Aggregation ${aggName} is not specified in the given query`);
    return this.client
      .search({
        index: this.index,
        body: query,
      })
      .then(res => res.body.aggregations[aggName])
      .then(resultExtractor);
  }
}

ElasticClient.prototype.toString = function toString() {
  return `ElasticClient(
    url: ${this.url},
    index: ${this.index})`;
};

module.exports = ElasticClient;
