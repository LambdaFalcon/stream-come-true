/* eslint-disable no-underscore-dangle */ // _source is in all query results

const { Client } = require('@elastic/elasticsearch');
const createError = require('http-errors');

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
  static getInstance(req, { sourceFieldName }) {
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
      .then(hits => hits.map(this.extractHighlightIfTextFilter(filters)))
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
   * If the passed filters are defined and contain a textfilter, returns a mapper that takes an
   * ElasticSearch hit object, extracts the first string in the highlight field and uses it as a
   * replacement for the textField of the `_source` object of the hit.
   *
   * This is used to return an {@link Item} that already has the text with the text filter match
   * highlighted.
   *
   * If the passed filters are undefined or the textfilter is not specified, this function returns
   * the identity function.
   *
   * @function HitMapper
   * @param {{ _source: { text: string }, highlight?: object }} hit ElasticSearch hit with _source
   *                                                                and optional highlight field
   * @returns {{ _source: { text: string }}} the same hit, with the first highlight string inserted
   *                                         in the field _source.text
   *
   * @param {Filters} filters text and time frame filters
   * @returns {HitMapper}
   */
  extractHighlightIfTextFilter({ textfilter = '' } = {}) {
    if (!textfilter) return hit => hit;

    const { textField } = this.queryFields;
    return ({ _source, highlight, ...rest }) => ({
      ...rest,
      _source: {
        ..._source,
        [textField]: highlight[textField][0],
      },
    });
  }

  /**
   * Computes a reasonable interval given a time frame.
   *
   * @private
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
