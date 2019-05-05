const { Client } = require('@elastic/elasticsearch');

// TODO: somehow pass this as an argument. Problem: it is used in a static method.
const { sourceFieldName } = require('../config');

/**
 * @class ElasticClient
 */
class ElasticClient {
  constructor(sourceName, { elasticURL, indices }) {
    this.url = elasticURL;
    this.index = indices[sourceName];
    this.client = new Client({ node: this.url });
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
    return [this.index, filters]; // TODO: real implementation
  }

  /**
   * Get the items over time aggregation with the given filters applied.
   *
   * @public
   * @param {Filters} filters text and time frame filters
   * @returns {Promise<Array<ItemsOverTimeElement>>} items over time
   */
  async itemsOverTime(filters) {
    return [this.index, filters]; // TODO: real implementation
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
    return [this.index, filters]; // TODO: real implementation
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
}

ElasticClient.prototype.toString = function toString() {
  return `ElasticClient(
    url: ${this.url},
    index: ${this.index})`;
};

module.exports = ElasticClient;
