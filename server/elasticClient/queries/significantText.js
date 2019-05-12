/**
 * Create a significant text aggregation query.
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the text field to aggregate on
 * @returns {{aggs: object}} a query object with the aggs field
 */
const significantText = (aggName, field) => ({
  aggs: {
    [aggName]: {
      significant_text: {
        field,
        filter_duplicate_text: true,
      },
    },
  },
});

module.exports = significantText;
