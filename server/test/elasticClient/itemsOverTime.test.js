// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

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

    it('should contain at least one element', async () => {
      const res = await client.itemsOverTime();
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.itemsOverTime();
      const item = res[0];
      item.should.have.property('time');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.itemsOverTime();
      const item = res[0];
      item.time.should.be.a('number');
      item.count.should.be.a('number');
    });
  });

  describe('with text filter', () => {
    const textfilter = 'google';
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.itemsOverTime(filters);
      const item = res[0];
      item.should.have.property('time');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.itemsOverTime(filters);
      const item = res[0];
      item.time.should.be.a('number');
      item.count.should.be.a('number');
    });
  });

  describe('with time frame filter', () => {
    const timeframe = '5m';
    const filters = { timeframe };
    const msPerMinute = 60000;
    const fiveMinutesAgo = new Date(Date.now().valueOf() - 5 * msPerMinute);

    it('should return an array', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain at least one element', async () => {
      const res = await client.itemsOverTime(filters);
      res.should.have.lengthOf.at.least(1);
    });

    it('should contain an element with the correct properties', async () => {
      const res = await client.itemsOverTime(filters);
      const item = res[0];
      item.should.have.property('time');
      item.should.have.property('count');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.itemsOverTime(filters);
      const item = res[0];
      item.time.should.be.a('number');
      item.count.should.be.a('number');
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await client.itemsOverTime(filters);
      res.map(item => new Date(item.time)).should.all.be.at.least(fiveMinutesAgo);
    });
  });
});
