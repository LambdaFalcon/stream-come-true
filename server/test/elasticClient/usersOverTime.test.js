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

describe('ElasticClient.usersOverTime()', function usersOverTimeTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an array', async () => {
      const res = await client.usersOverTime();
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.usersOverTime();
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.usersOverTime();
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = 'apex';
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.usersOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.usersOverTime(filters);
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.usersOverTime(filters);
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
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
      const res = await client.usersOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.usersOverTime(filters);
      res.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.usersOverTime(filters);
      res.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
      });
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await client.usersOverTime(filters);
      res.map(item => new Date(item.time)).should.all.be.at.most(fiveMinutesAgoRounded);
      res.map(item => new Date(item.time)).should.all.be.at.least(tenMinutesAgoRounded);
    });
  });
});
