const { Client } = require('@elastic/elasticsearch');

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
   *
   * @param {String} index
   * @param {Object} query
   * @returns {Promise<Object>}
   */
  search(index, query) {
    return this.client.search({
      index,
      body: query,
    });
  }
}

ElasticClient.prototype.toString = function toString() {
  return `ElasticClient(
    url: ${this.url},
    index: ${this.index})`;
};

module.exports = ElasticClient;
