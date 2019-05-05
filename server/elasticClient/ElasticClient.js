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
}

ElasticClient.prototype.toString = function toString() {
  return `ElasticClient(
    url: ${this.url},
    index: ${this.index})`;
};

module.exports = ElasticClient;
