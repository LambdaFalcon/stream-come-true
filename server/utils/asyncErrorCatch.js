const Promise = require('bluebird');

/**
 * Wrap an asynchronous Express.js route handler or middleware in a Promise,
 * catch errors and forward them to the next() middleware for automatic error
 * handling.
 * This also enables every route handler or middleware to use await syntax
 * (because it is async).
 *
 * @example
 *    const asyncErrorCatch = require('.../utils/asyncErrorCatch');
 *    const routeHandler = asyncErrorCatch(async (req, res, next) => {
 *        // route handler code, await syntax
 *    });
 *
 * @param {function} f Express.js route handler or middleware
 */
const asyncErrorCatch = f => (req, res, next) => Promise.resolve(f(req, res, next)).catch(next);

module.exports = asyncErrorCatch;
