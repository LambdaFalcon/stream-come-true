/* eslint-disable camelcase */ // results contain fileds with snakecase fields

const selectFields = {
  all: ({
    created_at, screen_name, text, domain,
  }) => ({
    created_at,
    screen_name,
    text,
    domain,
  }),
};

module.exports = selectFields;
