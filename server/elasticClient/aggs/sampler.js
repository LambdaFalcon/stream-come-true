/**
 * Create a sampler aggregation query.
 *
 * @param {string} aggName name of the aggregation
 * @param {number} size sample size (shard size)
 * @returns {{aggs: object}} a query object with the aggs field
 */
const sampler = (aggName, size) => ({
  aggs: {
    [aggName]: {
      sampler: {
        shard_size: size,
      },
    },
  },
});

module.exports = sampler;
