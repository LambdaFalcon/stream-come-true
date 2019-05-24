// Import the dependencies for testing
const chai = require('chai');
const chaiThings = require('chai-things');
const config = require('../../config');
const ElasticClient = require('../../elasticClient/ElasticClient');

// Configure chai
chai.should();
chai.use(chaiThings);

const client = new ElasticClient('twitter', config);

describe('ElasticClient.hashtagGraph()', function hashtagGraphTest() {
  this.timeout(5000);

  describe('without filters', () => {
    it('should return an object', async () => {
      const res = await client.hashtagGraph();
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const res = await client.hashtagGraph();
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const res = await client.hashtagGraph();
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });

    it('should return an object with vertices with the correct properties', async () => {
      const res = await client.hashtagGraph();
      res.vertices.forEach((item) => {
        item.should.have.property('field');
        item.should.have.property('term');
        item.should.have.property('weight');
        item.should.have.property('depth');
      });
    });

    it('should return an object with vertices with properties of the correct types', async () => {
      const res = await client.hashtagGraph();
      res.vertices.forEach((item) => {
        item.field.should.be.a('string');
        item.term.should.be.a('string');
        item.weight.should.be.a('number');
        item.depth.should.be.a('number');
      });
    });

    it('should return an object with connections with the correct properties', async () => {
      const res = await client.hashtagGraph();
      res.connections.forEach((item) => {
        item.should.have.property('source');
        item.should.have.property('target');
        item.should.have.property('weight');
        item.should.have.property('doc_count');
      });
    });

    it('should return an object with connections with properties of the correct types', async () => {
      const res = await client.hashtagGraph();
      res.connections.forEach((item) => {
        item.source.should.be.a('number');
        item.target.should.be.a('number');
        item.weight.should.be.a('number');
        item.doc_count.should.be.a('number');
      });
    });
  });

  describe('with text filter', () => {
    const textfilter = 'huawei';
    const filters = { textfilter };

    it('should return an object', async () => {
      const res = await client.hashtagGraph(filters);
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const res = await client.hashtagGraph(filters);
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const res = await client.hashtagGraph(filters);
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });
  });

  describe('with time frame filter', () => {
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
    const filters = { fromdatetime: oneHourAgo.toISOString() };

    it('should return an object', async () => {
      const res = await client.hashtagGraph(filters);
      res.should.be.instanceOf(Object);
    });

    it('should return an object with the correct properties', async () => {
      const res = await client.hashtagGraph(filters);
      res.should.have.property('vertices');
      res.should.have.property('connections');
    });

    it('should return an object with properties that are arrays', async () => {
      const res = await client.hashtagGraph(filters);
      res.vertices.should.be.instanceOf(Array);
      res.connections.should.be.instanceOf(Array);
    });
  });
});
