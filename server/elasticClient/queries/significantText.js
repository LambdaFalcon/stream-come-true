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
