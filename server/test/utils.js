/**
 * Returns the time n minutes ago.
 * Options can indicate wheter to round to the beginning or
 * end of the second.
 *
 * @param {number} n number of minutes
 * @param {object} options
 * @param {boolean} options.floor whether to round to the beginning of the second
 * @param {boolean} options.ceil whether to round to the end of the second
 */
const getNMinutesAgo = (n, { floor, ceil } = { floor: false, ceil: false }) => {
  const nMinutesAgo = new Date();
  nMinutesAgo.setMinutes(nMinutesAgo.getMinutes() - n);

  // optional rounding
  if (floor || ceil) nMinutesAgo.setMilliseconds(0);
  if (ceil) nMinutesAgo.setSeconds(nMinutesAgo.getSeconds() + 1);

  return nMinutesAgo;
};

module.exports = {
  getNMinutesAgo,
};
