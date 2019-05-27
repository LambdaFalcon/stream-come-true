// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');

const app = require('../../../app');
const testUtils = require('../../utils');

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

    it('should return an array of at most 101 elements', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.length.should.be.at.most(101);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where positive and negative counts sum up to total count', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = testUtils.textFilter;
    const filters = `?textfilter=${textfilter}`;
    const itemsOverTimeRoute = `${route}/items_over_time${filters}`;

    it('should return an array', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Array);
    });

    it('should return an array of at most 101 elements', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.length.should.be.at.most(101);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where positive and negative counts sum up to total count', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });
  });

  describe('with time frame filter', () => {
    const fiveMinutesAgo = testUtils.getNMinutesAgo(5);
    const tenMinutesAgo = testUtils.getNMinutesAgo(10);
    const filters = `?fromdatetime=${tenMinutesAgo.toISOString()}&todatetime=${fiveMinutesAgo.toISOString()}`;

    const fiveMinutesAgoRounded = testUtils.getNMinutesAgo(5, { ceil: true });
    const tenMinutesAgoRounded = testUtils.getNMinutesAgo(10, { floor: true });

    const itemsOverTimeRoute = `${route}/items_over_time${filters}`;

    it('should return an array', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Array);
    });

    it('should return an array of at most 101 elements', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.length.should.be.at.most(101);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.should.have.property('time');
        item.should.have.property('count');
        item.should.have.property('positive_count');
        item.should.have.property('negative_count');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        item.time.should.be.a('number');
        item.count.should.be.a('number');
        item.positive_count.should.be.a('number');
        item.negative_count.should.be.a('number');
      });
    });

    it('should contain elements where positive and negative counts sum up to total count', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.forEach((item) => {
        (item.positive_count + item.negative_count).should.be.within(0, item.count);
      });
    });

    it('should contain elements that are within the time frame filter', async () => {
      const res = await getRequest(itemsOverTimeRoute);
      res.body.map(item => new Date(item.time)).should.all.be.at.most(fiveMinutesAgoRounded);
      res.body.map(item => new Date(item.time)).should.all.be.at.least(tenMinutesAgoRounded);
    });
  });
});
