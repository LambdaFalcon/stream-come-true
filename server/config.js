const config = {
  env: process.env.NODE_ENV,
  elasticURL: 'http://rhea1.inf.usi.ch:9200',
  indices: {
    reddit: 'reddit_comments',
    twitter: 'tweets',
  },
};

module.exports = config;
