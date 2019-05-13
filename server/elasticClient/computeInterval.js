const debug = require('debug')('server:elastic');

const secondsPer = {
  d: 86400,
  h: 3600,
  m: 60,
  s: 1,
};

/**
 * Parse the timeframe and return it in seconds (as a number).
 *
 * @param {('5m'|'5h'|'5d')} timeframe a time frame as a string
 * @returns {number} the timeframe in seconds
 */
// eslint-disable-next-line no-underscore-dangle
const _decode = (timeframe) => {
  const regex = /^(\d+)([dhms])$/;
  const [, num, kind] = regex.exec(timeframe);
  return parseInt(num, 10) * secondsPer[kind];
};

/**
 * Encode a numeric (in seconds) interval and return it as a string.
 *
 * @param {number} interval a number of seconds
 * @returns {string} the interval as a string
 */
const encode = interval => `${interval}s`;

/**
 * Compute a good interval of time to use as bucket given the current time frame.
 * For now, the interval is about 1/100th of the time frame.
 *
 * @param {('5m'|'5h'|'5d')} seconds a time frame in seconds
 * @returns {string} a good interval
 */
const computeInterval = (seconds) => {
  const interval = Math.max(1, Math.round(seconds / 100)) || 1;
  const encodedInterval = encode(interval);
  debug(
    `Computing interval: time frame in seconds = ${seconds}, computed interval = ${encodedInterval}`,
  );
  return encodedInterval;
};

module.exports = computeInterval;
