/** @namespace utils.query */

/**
 * @memberof utils.query
 * @param {any} req
 */
exports.getFilter = (req) => {
  // @ts-ignore
  return req.query.filter ? JSON.parse(req.query.filter) : {};
};

/**
 * @memberof utils.query
 * @param {any} req
 * @param {{count: number, page: number}=} paginationDefaultValue
 * @returns {{page: number, count: number}}
 */

exports.getPagination = (req, paginationDefaultValue) => {
  const defaultValue = paginationDefaultValue || { count: 200, page: 1 };
  return {
    page: parseInt(req.query.page || defaultValue.page || "1"),
    count: parseInt(req.query.count || defaultValue.count || "200"),
  };
};
