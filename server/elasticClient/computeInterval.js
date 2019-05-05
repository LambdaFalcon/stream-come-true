const debug = require('debug')('server:elastic');

const seconds = {
  d: 86400,
  h: 3600,
  m: 60,
};

/**
 * Parse the timeframe and return it in seconds (as a number).
 *
 * @param {('5m'|'5h'|'5d')} timeframe a time frame as a string
 * @returns {number} the timeframe in seconds
 */
const decode = (timeframe) => {
  const regex = /^(\d+)([dhms])$/;
  const [, num, kind] = regex.exec(timeframe);
  return parseInt(num, 10) * seconds[kind];
};

/**
 * Encode a numeric (in seconds) interval and return it as a string.
 *
 * @param {number} interval a number of seconds
 * @returns {string} the interval as a string
 */
const encode = interval => `${interval}s`;

/**
 * Compute a good interval of time to use as bucket given the current timeframe.
 * For now, the interval is about 1/100th of the timeframe.
 *
 * @param {('5m'|'5h'|'5d')} timeframe the currently set timeframe
 * @returns {string} a good interval
 */
const computeInterval = (timeframe) => {
  debug(`Computing interval: timeframe=${timeframe}`);
  const decodedTimeframe = decode(timeframe);
  return encode(decodedTimeframe / 100);
};

module.exports = computeInterval;
