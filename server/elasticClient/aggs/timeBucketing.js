/**
 * Create a date histogram aggregation query.
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the datetime field to aggregate on
 * @param {string} interval interval specification in Date Math syntax, e.g. 5h
 *                          see {@link ElasticClient.computeInterval}
 * @returns {{aggs: object}} a query object with the aggs field
 */
const timeBucketing = (aggName, field, interval) => ({
  aggs: {
    [aggName]: {
      date_histogram: {
        field,
        interval,
      },
    },
  },
});

module.exports = timeBucketing;
