/* eslint-disable camelcase */ // results contain fileds with snakecase fields

/**
 * This object contains functions that can be used in Array.map to
 * select only the specified fields of each element.
 *
 * The selected fields should match the respective typedef in the
 * file types.js
 */
const selectFields = {
  all: ({
    created_at, screen_name, text, domain, user_image, sentiment,
  }) => ({
    created_at,
    screen_name,
    text,
    domain,
    user_image,
    sentiment,
  }),

  itemsOverTime: ({
    key,
    doc_count,
    sentiment_counts: {
      buckets: {
        negative_count: { doc_count: negative_count },
        positive_count: { doc_count: positive_count },
      },
    },
  }) => ({
    time: key,
    count: doc_count,
    negative_count,
    positive_count,
  }),

  popularKeywords: ({ key, score }) => ({
    keyword: key,
    count: score,
  }),

  usersOverTime: ({ key, users_count: { value } }) => ({
    time: key,
    count: value,
  }),

  popularUsers: ({ key, doc_count }) => ({
    user: key,
    count: doc_count,
  }),

  graph: ({ vertices, connections }) => ({
    vertices,
    connections,
  }),
};

module.exports = selectFields;
