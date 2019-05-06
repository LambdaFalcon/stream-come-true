// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

// Configure chai
chai.should();
chai.use(chaiThings);

const client = new ElasticClient('twitter', config);

describe('ElasticClient.popularKeywords()', function popularKeywordsTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an array', async () => {
      const res = await client.popularKeywords();
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.popularKeywords();
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.popularKeywords();
      const item = res[0];
      item.should.have.property('keyword');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.popularKeywords();
      const item = res[0];
      item.keyword.should.be.a('string');
      item.count.should.be.a('number');
    });
  });

  describe('with text filter', () => {
    const textfilter = 'google';
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.popularKeywords(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.popularKeywords(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.popularKeywords(filters);
      const item = res[0];
      item.should.have.property('keyword');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.popularKeywords(filters);
      const item = res[0];
      item.keyword.should.be.a('string');
      item.count.should.be.a('number');
    });

    it('should contain at least one element matching the text filter', async () => {
      const res = await client.popularKeywords(filters);
      res.should.contain.an.item.with.property('keyword', textfilter);
    });
  });

  describe('with time frame filter', () => {
    const timeframe = '1h';
    const filters = { timeframe };

    it('should return an array', async () => {
      const res = await client.popularKeywords(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.popularKeywords(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.popularKeywords(filters);
      const item = res[0];
      item.should.have.property('keyword');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.popularKeywords(filters);
      const item = res[0];
      item.keyword.should.be.a('string');
      item.count.should.be.a('number');
    });
  });
});
