// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

// Configure chai
chai.should();
chai.use(chaiThings);

const client = new ElasticClient('twitter', config);

describe('ElasticClient.spiderFromHashtag()', function spiderFromHashtagTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an object', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });

    it('should return an object with vertices with the correct properties', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.vertices.forEach((item) => {
        item.should.have.property('field');
        item.should.have.property('term');
        item.should.have.property('weight');
        item.should.have.property('depth');
      });
    });

    it('should return an object with vertices with properties of the correct types', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.vertices.forEach((item) => {
        item.field.should.be.a('string');
        item.term.should.be.a('string');
        item.weight.should.be.a('number');
        item.depth.should.be.a('number');
      });
    });

    it('should return an object with connections with the correct properties', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.connections.forEach((item) => {
        item.should.have.property('source');
        item.should.have.property('target');
        item.should.have.property('weight');
        item.should.have.property('doc_count');
      });
    });

    it('should return an object with connections with properties of the correct types', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      res.connections.forEach((item) => {
        item.source.should.be.a('number');
        item.target.should.be.a('number');
        item.weight.should.be.a('number');
        item.doc_count.should.be.a('number');
      });
    });

    it('should return an object with vertices that do not include excluded terms', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term));
      rest.forEach(({ term }) => {
        res.vertices.map(v => v.term).should.not.contain(term);
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = 'apex';
    const filters = { textfilter };

    it('should return an object', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });
  });

  describe('with time frame filter', () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const filters = { fromdatetime: oneHourAgo.toISOString() };

    it('should return an object', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const {
        vertices: [v1, ...rest],
      } = await client.hashtagGraph();
      const res = await client.spiderFromHashtag(v1.term, rest.map(v => v.term), filters);
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });
  });
});
