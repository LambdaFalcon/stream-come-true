/**
 * Create a significant text aggregation query.
 * Pass as fields to exclude the text filter if it is used.
 *
 * @param {string} aggName name of the aggregation
 * @param {string} field name of the text field to aggregate on
 * @param {Array<string>} exclude strings to exclude
 * @returns {{aggs: object}} a query object with the aggs field
 */
const significantText = (aggName, field, exclude) => ({
  aggs: {
    [aggName]: {
      significant_text: {
        field,
        filter_duplicate_text: true,
        size: 10,
        shard_size: 500,
        exclude,
      },
    },
  },
});

module.exports = significantText;
