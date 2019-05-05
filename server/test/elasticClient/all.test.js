// Import the dependencies for testing
const chai = require('chai');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

// Configure chai
chai.should();

const client = new ElasticClient('twitter', config);

describe('ElasticClient.all()', () => {
  describe('without filters', () => {
    it('should return an array', async () => {
      const res = await client.all();
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.all();
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.all();
      const item = res[0];
      item.should.have.property('created_at');
      item.should.have.property('screen_name');
      item.should.have.property('text');
      item.should.have.property('domain');
    });
  });

  describe('with text filter', () => {
    const textfilter = 'google';
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.all(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.all(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element that matches the text filter', async () => {
      const res = await client.all(filters);
      const item = res[0];
      item.text.should.have.string(textfilter);
    });
  });

  describe('with time frame filter', () => {
    const timeframe = '5m';
    const filters = { timeframe };
    const msPerMinute = 60000;
    const fiveMinutesAgo = new Date(Date.now().valueOf() - 5 * msPerMinute);

    it('should return an array', async () => {
      const res = await client.all(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.all(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element that is within the time frame filter', async () => {
      const res = await client.all(filters);
      res.map(item => new Date(item.created_at)).should.all.be.at.least(fiveMinutesAgo);
    });
  });
});
