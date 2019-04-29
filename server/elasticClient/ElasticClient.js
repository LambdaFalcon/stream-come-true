const { Client } = require("@elastic/elasticsearch");

const { elasticURL } = require("../config");

class ElasticClient {
  constructor() {
    this.client = new Client({ node: elasticURL });
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
      body: query
    });
  }
}

module.exports = ElasticClient;
