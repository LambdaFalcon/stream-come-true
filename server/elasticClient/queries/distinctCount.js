/**
 * Create a distinct count (cardinality) aggregation query.
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the text field to aggregate on
 * @returns {{aggs: object}} a query object with the aggs field
 */
const distinctCount = (aggName, field) => ({
  aggs: {
    [aggName]: {
      cardinality: {
        field,
      },
    },
  },
});

module.exports = distinctCount;
