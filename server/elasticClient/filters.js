/**
 * Create the time frame filter part of the query.
 *
 * @param {string} value time frame to keep, e.g. 5m, 5h, 5d. See types.js for more info
 * @param {string} dateField name of the date field
 */
const timeFrameRangeFilter = (value, dateField) => ({
  range: {
    [dateField]: {
      gte: `now-${value}`, // e.g.: 'now-5h'
    },
  },
});

/**
 * Create the text filter part of the query.
 *
 * @param {string} text the text filter
 * @param {string[]} textFields all text fields to filter on
 * @returns {object} part of a query
 */
const textMatchFilter = (text, textFields) => {
  if (text) {
    return {
      multi_match: {
        query: text,
        fields: textFields,
      },
    };
  }
  return {
    match_all: {},
  };
};

/**
 * Create a complete ElasticSearch query object with the given filters applied.
 * Defaults are applied for the time frame filter, it is set to '5h'.
 *
 * @param {Filters} filters text and time frame filters
 * @param {string} dateField name of the date field
 * @param {string[]} textFields names of all text fields
 */
const applyFilters = ({ timeframe = '5h', textfilter } = {}, dateField, textFields) => ({
  query: {
    bool: {
      must: [textMatchFilter(textfilter, textFields)],
      filter: timeFrameRangeFilter(timeframe, dateField),
    },
  },
});

module.exports = applyFilters;
