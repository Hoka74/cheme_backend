/** @namespace middleware.async */

/**
 * @memberof middleware.async
 * @param {Function} fn
 */
const async = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = async;
