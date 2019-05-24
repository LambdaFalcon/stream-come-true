// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');

const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');
const testUtils = require('../utils');

// Configure chai
chai.should();
chai.use(chaiThings);

const client = new ElasticClient('twitter', config);

describe('ElasticClient.itemsOverTime()', function itemsOverTimeTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an array', async () => {
      const res = await client.itemsOverTime();
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.itemsOverTime();
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.itemsOverTime();
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where positive and negative counts sum up to total count', async () => {
      const res = await client.itemsOverTime();
      res.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = testUtils.textFilter;
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.itemsOverTime(filters);
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.itemsOverTime(filters);
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where positive and negative counts sum up to total count', async () => {
      const res = await client.itemsOverTime();
      res.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });
  });

  describe('with time frame filter', () => {
    const fiveMinutesAgo = testUtils.getNMinutesAgo(5);
    const tenMinutesAgo = testUtils.getNMinutesAgo(10);
    const filters = {
      fromdatetime: tenMinutesAgo.toISOString(),
      todatetime: fiveMinutesAgo.toISOString(),
    };

    const fiveMinutesAgoRounded = testUtils.getNMinutesAgo(5, { ceil: true });
    const tenMinutesAgoRounded = testUtils.getNMinutesAgo(10, { floor: true });

    it('should return an array', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.itemsOverTime(filters);
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.itemsOverTime(filters);
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where the sum of positive and negative counts is within 0 and total', async () => {
      const res = await client.itemsOverTime();
      res.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await client.itemsOverTime(filters);
      res.map(item => new Date(item.time)).should.all.be.at.most(fiveMinutesAgoRounded);
      res.map(item => new Date(item.time)).should.all.be.at.least(tenMinutesAgoRounded);
    });
  });
});
