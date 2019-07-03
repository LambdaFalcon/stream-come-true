// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');

const app = require('../../../app');

// Configure chai
chai.should();
chai.use(chaiThings);

const route = '/api/v1/twitter';
const getRequest = async path => chai.request(app).get(path);
const postRequest = async (path, body) => chai
  .request(app)
  .post(path)
  .send(body);

describe.skip('/api/v1/twitter/hashtag_graph ROUTE', function spiderFromHashtagTest() {
  this.timeout(5000);
  const hashtagGraphRoute = `${route}/hashtag_graph`;

  describe('GET without filters', () => {
    it('should return an object', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.should.have.property('vertices');
      res.body.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.vertices.should.be.instanceOf(Array);
      res.body.connections.should.be.instanceOf(Array);
    });

    it('should return an object with vertices with the correct properties', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.vertices.forEach((item) => {
        item.should.have.property('field');
        item.should.have.property('term');
        item.should.have.property('weight');
        item.should.have.property('depth');
      });
    });

    it('should return an object with vertices with properties of the correct types', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.vertices.forEach((item) => {
        item.field.should.be.a('string');
        item.term.should.be.a('string');
        item.weight.should.be.a('number');
        item.depth.should.be.a('number');
      });
    });

    it('should return an object with connections with the correct properties', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.connections.forEach((item) => {
        item.should.have.property('source');
        item.should.have.property('target');
        item.should.have.property('weight');
        item.should.have.property('doc_count');
      });
    });

    it('should return an object with connections with properties of the correct types', async () => {
      const res = await getRequest(hashtagGraphRoute);
      res.body.connections.forEach((item) => {
        item.source.should.be.a('number');
        item.target.should.be.a('number');
        item.weight.should.be.a('number');
        item.doc_count.should.be.a('number');
      });
    });
  });

  describe('POST without filters', () => {
    it('should return an object', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.should.have.status(200);
      res.body.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.should.have.property('vertices');
      res.body.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.vertices.should.be.instanceOf(Array);
      res.body.connections.should.be.instanceOf(Array);
    });

    it('should return an object with vertices with the correct properties', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.vertices.forEach((item) => {
        item.should.have.property('field');
        item.should.have.property('term');
        item.should.have.property('weight');
        item.should.have.property('depth');
      });
    });

    it('should return an object with vertices with properties of the correct types', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.vertices.forEach((item) => {
        item.field.should.be.a('string');
        item.term.should.be.a('string');
        item.weight.should.be.a('number');
        item.depth.should.be.a('number');
      });
    });

    it('should return an object with connections with the correct properties', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.connections.forEach((item) => {
        item.should.have.property('source');
        item.should.have.property('target');
        item.should.have.property('weight');
        item.should.have.property('doc_count');
      });
    });

    it('should return an object with connections with properties of the correct types', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      res.body.connections.forEach((item) => {
        item.source.should.be.a('number');
        item.target.should.be.a('number');
        item.weight.should.be.a('number');
        item.doc_count.should.be.a('number');
      });
    });

    it('should return an object with vertices that do not include excluded terms', async () => {
      const {
        body: {
          vertices: [v1, ...rest],
        },
      } = await getRequest(hashtagGraphRoute);
      const body = {
        hashtag: v1.term,
        exclude: rest.map(v => v.term),
      };
      const res = await postRequest(hashtagGraphRoute, body);
      rest.forEach(({ term }) => {
        res.body.vertices.map(v => v.term).should.not.contain(term);
      });
    });
  });
});
