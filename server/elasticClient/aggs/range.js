/**
 * Create a range aggregation query.
 *
 * @typedef Range a range as described in the ElasticSearch documentation at  https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-range-aggregation.html
 * @property {number} [from] lower limit
 * @property {number} [to] upper limit
 * @property {string} [key] key that describes this range
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the field to aggregate on
 * @param {Array<Range>} ranges aggregation ranges
 * @param {boolean} keyed whether to return buckets as an array or as an object with keys
 * @returns {{aggs: object}} a query object with the aggs field
 */
const range = (aggName, field, ranges, keyed) => ({
  aggs: {
    [aggName]: {
      range: {
        field,
        keyed,
        ranges,
      },
    },
  },
});

module.exports = range;
