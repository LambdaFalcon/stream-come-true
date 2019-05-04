// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

const route = '/api/v1';

describe('/api/v1 ROUTE', () => {
  describe(`GET /${route}`, () => {
    it('should not be available', async () => {
      const res = await chai.request(app).get(route);
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });

  describe(`POST /${route}`, () => {
    it('should not be available', async () => {
      const res = await chai.request(app).post(route);
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });

  describe(`PUT /${route}`, () => {
    it('should not be available', async () => {
      const res = await chai.request(app).put(route);
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });

  describe(`PATCH /${route}`, () => {
    it('should not be available', async () => {
      const res = await chai.request(app).patch(route);
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });
});
