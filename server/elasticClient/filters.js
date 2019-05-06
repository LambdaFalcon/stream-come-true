const debug = require('debug')('server:elastic');

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
 * @param {string} textField the field to filter on
 * @returns {object} part of a query
 */
const textMatchFilter = (text, textField) => {
  if (text) {
    return {
      multi_match: {
        query: text,
        fields: textField,
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
 * @function ApplyFiltersFunc
 * @param {Filters} filters text and time frame filters
 * @param {string} dateField name of the date field
 * @param {string} textField name of the text field
 * @returns {object} an ElasticSearch query object
 *
 * @param {object} config the application configuration
 * @returns {ApplyFiltersFunc} the actual function that applied filters
 */
const applyFilters = config => (
  { timeframe = config.defaultTimeFrameFilter, textfilter } = {},
  dateField,
  textField,
) => {
  debug(`Applying filters: textfilter=${textfilter}, timeframe=${timeframe}`);
  const query = {
    query: {
      bool: {
        must: [textMatchFilter(textfilter, textField)],
        filter: timeFrameRangeFilter(timeframe, dateField),
      },
    },
  };
  return query;
};

module.exports = applyFilters;
