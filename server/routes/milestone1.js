const express = require("express");
const router = express.Router();

const ElasticClient = require("../elasticClient/ElasticClient");
const elasticClient = new ElasticClient();

const query = {
  aggs: {
    posts_over_time: {
      date_histogram: {
        field: "creation_time",
        interval: "hour"
      }
    }
  },
  size: 0
};

const index = "reddit_news";

router.get("/", async (req, res, next) => {
  const result = await elasticClient.search(index, query);

  res.json(result.body);
});

module.exports = router;
