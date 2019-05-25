describe("Check Website", function() {
  it("Website", function() {
    cy.visit("/");
  });
});

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
});
