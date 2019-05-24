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

describe('ElasticClient.all()', function allTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an array', async () => {
      const res = await client.all();
      res.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await client.all();
      res.forEach((item) => {
        item.should.have.property('created_at');
        item.should.have.property('screen_name');
        item.should.have.property('text');
        item.should.have.property('domain');
        item.should.have.property('user_image');
        item.should.have.property('sentiment');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await client.all();
      res.forEach((item) => {
        item.created_at.should.be.a('string');
        item.screen_name.should.be.a('string');
        item.text.should.be.a('string');
        item.domain.should.be.a('string');
        item.user_image.should.be.a('string');
        item.sentiment.should.be.a('number');
      });
    });

    it('should contain elements with properties in the correct ranges', async () => {
      const res = await client.all();
      res.forEach((item) => {
        new Date(item.created_at).should.be.at.most(new Date());
        item.sentiment.should.be.within(0, 1);
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = testUtils.textFilter;
    const filters = { textfilter };

    it('should return an array', async () => {
      const res = await client.all(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements that match the text filter', async () => {
      const res = await client.all(filters);
      res.map(item => item.text.toLowerCase()).should.all.have.string(`<em>${textfilter}</em>`);
    });
  });

  describe('with time frame filter', () => {
    const fiveMinutesAgo = new Date();
    const tenMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 10);
    const filters = {
      fromdatetime: tenMinutesAgo.toISOString(),
      todatetime: fiveMinutesAgo.toISOString(),
    };

    it('should return an array', async () => {
      const res = await client.all(filters);
      res.should.be.instanceOf(Array);
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await client.all(filters);
      res.map(item => new Date(item.created_at)).should.all.be.at.most(fiveMinutesAgo);
      res.map(item => new Date(item.created_at)).should.all.be.at.least(tenMinutesAgo);
    });
  });
});
