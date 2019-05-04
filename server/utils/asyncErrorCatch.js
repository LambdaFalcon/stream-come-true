const Promise = require('bluebird');

const asyncErrorCatch = f => (req, res, next) => Promise.resolve(f(req, res, next)).catch(next);

module.exports = asyncErrorCatch;
