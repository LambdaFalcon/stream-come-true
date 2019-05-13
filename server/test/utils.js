/**
 * Returns the time n minutes ago, rounded to the earlier or later second
 * depending on the lowerBound flag.
 *
 * @param {number} n number of minutes
 * @param {boolean} lowerBound whether this needs to be rounded to the second (earlier)
 *                             or not (rounded to later second)
 */
const getNMinutesAgo = (n, lowerBound) => {
  const nMinutesAgo = new Date();
  nMinutesAgo.setMinutes(nMinutesAgo.getMinutes() - n);
  nMinutesAgo.setMilliseconds(0);
  if (lowerBound) nMinutesAgo.setSeconds(0);
  else nMinutesAgo.setSeconds(nMinutesAgo.getSeconds() + 1);
  return nMinutesAgo;
};

module.exports = {
  getNMinutesAgo,
};
