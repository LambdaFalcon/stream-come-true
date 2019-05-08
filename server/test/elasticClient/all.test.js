// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

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
      item.should.have.property('user_image');
    });

    it('should contain an element with properties of the correct types', async () => {
      const res = await client.all();
      const item = res[0];
      item.created_at.should.be.a('string');
      item.screen_name.should.be.a('string');
      item.text.should.be.a('string');
      item.domain.should.be.a('string');
      item.user_image.should.be.a('string');
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

    it('should contain elements that match the text filter', async () => {
      const res = await client.all(filters);
      res.map(item => item.text.toLowerCase()).should.all.have.string(`<em>${textfilter}</em>`);
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

    it('should contain elements that are within the time frame filter', async () => {
      const res = await client.all(filters);
      res.map(item => new Date(item.created_at)).should.all.be.at.least(fiveMinutesAgo);
    });
  });
});
