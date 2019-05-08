/* eslint-disable camelcase */ // results contain fileds with snakecase fields

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
