// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('ROOT ROUTE', () => {
  describe.skip('GET /', () => {
    it('should get the homepage', async () => {
      const res = await chai.request(app).get('/');
      res.should.have.status(200);
      res.text.should.contain('<!doctype html>');
    });
  });

  describe('POST /', () => {
    it('should not be available', async () => {
      const res = await chai.request(app).post('/');
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });

  describe('PUT /', () => {
    it('should not be available', async () => {
      const res = await chai.request(app).put('/');
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });

  describe('PATCH /', () => {
    it('should not be available', async () => {
      const res = await chai.request(app).patch('/');
      res.should.have.status(404);
      res.text.should.contain('Not Found');
    });
  });
});
