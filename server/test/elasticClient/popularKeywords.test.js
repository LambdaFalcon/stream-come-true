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

    it('should contain elements with the correct properties', async () => {
      const res = await client.popularKeywords();
      res.forEach((item) => {
        item.should.have.property('keyword');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.popularKeywords();
      res.forEach((item) => {
        item.keyword.should.be.a('string');
        item.count.should.be.a('number');
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = 'apex';
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.popularKeywords(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.popularKeywords(filters);
      res.forEach((item) => {
        item.should.have.property('keyword');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.popularKeywords(filters);
      res.forEach((item) => {
        item.keyword.should.be.a('string');
        item.count.should.be.a('number');
      });
    });

    it('should contain no elements matching the text filter because it is excluded', async () => {
      const res = await client.popularKeywords(filters);
      if (res.length !== 0) {
        res.should.not.contain.an.item.with.property('keyword', textfilter);
      }
    });
  });

  describe('with time frame filter', () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const filters = { fromdatetime: oneHourAgo.toISOString() };

    it('should return an array', async () => {
      const res = await client.popularKeywords(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.popularKeywords(filters);
      res.forEach((item) => {
        item.should.have.property('keyword');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.popularKeywords(filters);
      res.forEach((item) => {
        item.keyword.should.be.a('string');
        item.count.should.be.a('number');
      });
    });
  });
});
