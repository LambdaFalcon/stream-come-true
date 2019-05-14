const port = 9999;
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9000/"
    : `https://rhea.inf.usi.ch:${port}/`;

const localhost = {
  api_v1: `${baseUrl}api/v1/`
};

const config = {
  red_over_time: localhost["api_v1"].concat("reddit/items_over_time"),
  twit_over_time: localhost["api_v1"].concat("twitter/items_over_time"),
  red_pop_key_words: localhost["api_v1"].concat("reddit/popular_keywords"),
  twit_pop_key_words: localhost["api_v1"].concat("twitter/popular_keywords"),
  red_user_over_time: localhost["api_v1"].concat("reddit/users_over_time"),
  twit_user_over_time: localhost["api_v1"].concat("twitter/users_over_time"),
  red_pop_users: localhost["api_v1"].concat("reddit/popular_users"),
  twit_pop_users: localhost["api_v1"].concat("twitter/popular_users"),
  red_sent_analysis: localhost["api_v1"].concat("reddit/sentiment"),
  twit_sent_analysis: localhost["api_v1"].concat("twitter/sentiment"),
  reddit_data: localhost["api_v1"].concat("reddit/"),
  twit_data: localhost["api_v1"].concat("twitter/")
};

export default config;
