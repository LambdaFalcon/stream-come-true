// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

const route = '/api/v1';

describe('/api/v1/:source ROUTE', () => {
  describe(`GET /${route}/twitter`, () => {
    it('should be available', async () => {
      const res = await chai.request(app).get(`${route}/twitter`);
      res.should.have.status(200);
    });
  });

  describe(`GET /${route}/reddit`, () => {
    it('should be available', async () => {
      const res = await chai.request(app).get(`${route}/reddit`);
      res.should.have.status(200);
    });
  });

  describe(`GET /${route}/does_not_exist`, () => {
    it('should not be available', async () => {
      const res = await chai.request(app).get(`${route}/does_not_exist`);
      res.should.have.status(404);
      res.text.should.contain('Source does_not_exist is not available');
    });
  });
});
