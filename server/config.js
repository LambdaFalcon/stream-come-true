const config = {
  env: process.env.NODE_ENV,
  elasticURL: 'http://rhea1.inf.usi.ch:9200',
  indices: {
    reddit: 'reddit_comments',
    twitter: 'tweets',
  },
  queryFields: {
    dateField: 'created_at',
    textField: 'text',
  },
  defaultTimeFrameFilter: '5h',
  sourceFieldName: 'source',

  // Defaults and constants for queries
  // - default range for date histograms
  defaultHourRange: 5,
  // - buckets for time histograms
  overTimeSplits: 100,
  // - size of sample for significant text agg
  samplerSize: 1000,
};

module.exports = config;
