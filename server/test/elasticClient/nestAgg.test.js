// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const ElasticClient = require('../../elasticClient/ElasticClient');
const timeBucketing = require('../../elasticClient/queries/timeBucketing');
const distinctCount = require('../../elasticClient/queries/distinctCount');

// Configure chai
chai.should();
chai.use(chaiThings);

describe('ElasticClient.nestAgg()', () => {
  describe('nesting one agg', () => {
    it('should nest one agg into another as expected', () => {
      const parentAggName = 'over_time';
      const aggToNestName = 'count_users';
      const timeBucketsAgg = timeBucketing(parentAggName, 'created_at', '5m');
      const distinctCountAgg = distinctCount(aggToNestName, 'screen_name');
      const nestedAgg = ElasticClient.nestAgg(timeBucketsAgg, parentAggName, distinctCountAgg);

      const expected = {
        aggs: {
          [parentAggName]: {
            date_histogram: {
              field: 'created_at',
              interval: '5m',
            },
            aggs: {
              [aggToNestName]: {
                cardinality: {
                  field: 'screen_name',
                },
              },
            },
          },
        },
      };

      nestedAgg.should.deep.equal(expected);
    });
  });
});
