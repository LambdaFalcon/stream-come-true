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
    created_at, screen_name, text, domain, user_image,
  }) => ({
    created_at,
    screen_name,
    text,
    domain,
    user_image,
  }),

  itemsOverTime: ({ key, doc_count }) => ({
    time: key,
    count: doc_count,
  }),

  popularKeywords: ({ key, doc_count }) => ({
    keyword: key,
    count: doc_count,
  }),
};

module.exports = selectFields;
