// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');

const app = require('../../../app');

// Configure chai
chai.should();
chai.use(chaiThings);

const route = '/api/v1/twitter';
const getRequest = async path => chai.request(app).get(path);

describe('/api/v1/twitter/items_over_time ROUTE', function itemsOverTimeTest() {
  this.timeout(5000);

  describe('without filters', () => {
    const itemsOverTimeRoute = `${route}/items_over_time`;

    it('should return an array', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = 'apex';
    const filters = `?textfilter=${textfilter}`;
    const itemsOverTimeRoute = `${route}/items_over_time${filters}`;

    it('should return an array', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
      });
    });
  });

  describe('with time frame filter', () => {
    const fiveMinutesAgo = new Date();
    const tenMinutesAgo = new Date();
    fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    const filters = `?fromdatetime=${tenMinutesAgo.toISOString()}&todatetime=${fiveMinutesAgo.toISOString()}`;

    const itemsOverTimeRoute = `${route}/items_over_time${filters}`;

    it('should return an array', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Array);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
      });
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.map(item => new Date(item.time)).should.all.be.at.most(fiveMinutesAgo);
      res.body.map(item => new Date(item.time)).should.all.be.at.least(tenMinutesAgo);
    });
  });
});
