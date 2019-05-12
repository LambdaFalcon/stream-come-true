const debug = require('debug')('server:elastic');

/**
 * Create the time frame filter part of the query.
 *
 * @param {string} fromdatetime a datestring indicating the start of time frame to consider
 * @param {string} todatetime a datestring indicating the end of time frame to consider
 * @param {string} dateField name of the date field
 */
const timeFrameRangeFilter = (fromdatetime, todatetime, dateField) => ({
  range: {
    [dateField]: {
      gte: fromdatetime,
      lte: todatetime,
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
 * @param {object} config UNUSED: the application configuration
 * @returns {ApplyFiltersFunc} the actual function that applies filters
 */
const applyFilters = _config => (
  { textfilter, fromdatetime, todatetime } = {},
  dateField,
  textField,
) => {
  debug(
    `Applying filters: textfilter=${textfilter}, fromdatetime=${fromdatetime}, todatetime=${todatetime}`,
  );
  const query = {
    query: {
      bool: {
        must: [textMatchFilter(textfilter, textField)],
        filter: timeFrameRangeFilter(fromdatetime, todatetime, dateField),
      },
    },
  };
  return query;
};

module.exports = applyFilters;
