/**
 * Create a terms count (terms) aggregation query.
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the text field to aggregate on
 * @returns {{aggs: object}} a query object with the aggs field
 */
const termsCount = (aggName, field) => ({
  aggs: {
    [aggName]: {
      terms: {
        field,
      },
    },
  },
});

module.exports = termsCount;
