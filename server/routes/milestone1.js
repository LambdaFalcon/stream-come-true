const express = require("express");
const router = express.Router();
const { Client } = require("@elastic/elasticsearch");

const client = new Client({ node: "http://rhea1.inf.usi.ch:9200" });

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
  const result = await client.search({
    index,
    body: query
  });

  res.json(result.body);
});

module.exports = router;
