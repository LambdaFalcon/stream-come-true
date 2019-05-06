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
