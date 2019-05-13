/**
 * Subtract a given number of hours from a given date.
 *
 * @param {string} ds a date string
 * @param {number} h a number of hours to subtract
 * @returns {string} a new date string with the hours subtracted
 */
const minusHours = (ds, h) => {
  const d = new Date(ds);
  d.setHours(d.getHours() - h);
  return d.toISOString();
};

module.exports = {
  minusHours,
};
