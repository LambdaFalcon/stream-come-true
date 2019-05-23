// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const chaiHttp = require('chai-http');

const app = require('../../../app');

// Configure chai
chai.use(chaiHttp);
chai.use(chaiThings);
chai.should();

const route = '/api/v1';
const getRequest = async path => chai.request(app).get(path);

describe('/api/v1/:source ROUTE', function sourceTest() {
  this.timeout(5000);

  describe(`GET ${route}/twitter`, () => {
    const twitterRoute = `${route}/twitter`;

    it('should be available', async () => {
      const res = await getRequest(twitterRoute);
      res.should.have.status(200);
    });

    it('should return an array', async () => {
      const res = await getRequest(twitterRoute);
      res.body.should.be.instanceOf(Array);
    });

    it('should contain 15 or less elements', async () => {
      const res = await getRequest(twitterRoute);
      res.body.should.have.lengthOf.at.most(15);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(twitterRoute);
      res.body.forEach((item) => {
        item.should.have.property('created_at');
        item.should.have.property('screen_name');
        item.should.have.property('text');
        item.should.have.property('domain');
        item.should.have.property('user_image');
        item.should.have.property('sentiment');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(twitterRoute);
      res.body.forEach((item) => {
        item.created_at.should.be.a('string');
        item.screen_name.should.be.a('string');
        item.text.should.be.a('string');
        item.domain.should.be.a('string');
        item.user_image.should.be.a('string');
        item.sentiment.should.be.a('number');
      });
    });

    it('should contain elements with properties in the correct ranges', async () => {
      const res = await getRequest(twitterRoute);
      res.body.forEach((item) => {
        new Date(item.created_at).should.be.at.most(new Date());
        item.sentiment.should.be.within(0, 1);
      });
    });

    it('should contain elements that match a given filter', async () => {
      const textfilter = 'apex';
      const res = await getRequest(`${twitterRoute}?textfilter=${textfilter}`);
      res.body
        .map(item => item.text.toLowerCase())
        .should.all.have.string(`<b>${textfilter}</b>`);
    });
  });

  describe(`GET ${route}/reddit`, () => {
    const redditRoute = `${route}/reddit`;

    it('should be available', async () => {
      const res = await getRequest(redditRoute);
      res.should.have.status(200);
    });

    it('should return an array', async () => {
      const res = await getRequest(redditRoute);
      res.body.should.be.instanceOf(Array);
    });

    it('should contain 15 or less elements', async () => {
      const res = await getRequest(redditRoute);
      res.body.should.have.lengthOf.at.most(15);
    });

    it('should contain elements with the correct properties', async () => {
      const res = await getRequest(redditRoute);
      res.body.forEach((item) => {
        item.should.have.property('created_at');
        item.should.have.property('screen_name');
        item.should.have.property('text');
        item.should.have.property('domain');
        item.should.have.property('user_image');
        item.should.have.property('sentiment');
      });
    });

    it('should contain elements with properties of the correct types', async () => {
      const res = await getRequest(redditRoute);
      res.body.forEach((item) => {
        item.created_at.should.be.a('string');
        item.screen_name.should.be.a('string');
        item.text.should.be.a('string');
        item.domain.should.be.a('string');
        item.user_image.should.be.a('string');
        item.sentiment.should.be.a('number');
      });
    });

    it('should contain elements with properties in the correct ranges', async () => {
      const res = await getRequest(redditRoute);
      res.body.forEach((item) => {
        new Date(item.created_at).should.be.at.most(new Date());
        item.sentiment.should.be.within(0, 1);
      });
    });

    it('should contain elements that match a given filter', async () => {
      const textfilter = 'apex';
      const res = await getRequest(`${redditRoute}?textfilter=${textfilter}`);
      res.body
        .map(item => item.text.toLowerCase())
        .should.all.have.string(`<b>${textfilter}</b>`);
    });
  });

  describe(`GET ${route}/does_not_exist`, () => {
    it('should not be available', async () => {
      const res = await getRequest(`${route}/does_not_exist`);
      res.should.have.status(404);
      res.text.should.contain('Source does_not_exist is not available');
    });
  });
});
