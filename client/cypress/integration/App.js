/**
 * describe; It groups tests
 * it; the runing with the description and the test to be done
 * In this case we are testing if we can acces the main react app file
 */
describe("Check Website", function() {
  it("Website", function() {
    cy.visit("/");
  });
});
/**
 * Checking if we get an answer from the apis and the server
 * method; defines the type of request that we are making GET, POST, UPDATE, DELETE etc.
 * url; The link where to make the request
 * delay: The delay time that it needs to wait for the request.
 * cy.server; global variable for server
 * cy.route; global variable for the route API
 */
describe("Check API Requests", function() {
  it("Reddit Over Time", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost/9000/api/v1/reddit/items_over_time/",
      delay: 1000
    });
  });
  it("Twitter Over Time", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/twitter/items_over_time",
      delay: 1000
    });
  });
  it("Reddit Popular Keyword", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/reddit/popular_keywords",
      delay: 1000
    });
  });
  it("Twitter Popular Keyword", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/twitter/popular_keywords",
      delay: 1000
    });
  });
  it("Reddit Users Over Time", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/reddit/users_over_time",
      delay: 1000
    });
  });
  it("Twitter Users Over Time", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/twitter/users_over_time",
      delay: 1000
    });
  });
  it("Reddit Popular User", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/reddit/popular_users",
      delay: 1000
    });
  });
  it("Tweeter Popular User", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/twitter/popular_users",
      delay: 1000
    });
  });
  it("Reddit Sentimental Analysis", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/reddit/sentiment",
      delay: 1000
    });
  });
  it("Twitter Sentimental Analysis", function() {
    cy.server({
      method: "GET",
      url: "http://localhost/9000",
      delay: 1000
    });
    cy.route({
      method: "GET",
      url: "http://localhost:9000/api/v1/twitter/sentiment",
      delay: 1000
    });
  });
});
