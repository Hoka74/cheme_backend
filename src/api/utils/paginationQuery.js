/** @namespace utils.pagination */

/**
 * put the function in last of aggregation query to setup pagination
 * @memberof utils.pagination
 * @param {number} page
 * @param {number} count
 *
 * */
exports.paginationQuery = (page, count) => {
  return {
    $facet: {
      metadata: [{ $count: "total" }],
      data: [{ $skip: (page - 1) * count }, { $limit: count }],
    },
  };
};

/**
 * the function prepare the data comes from database in aggregation form pagination
 * @memberof utils.pagination
 * @param {any} result
 *
 * */
exports.setupPagination = (result) => {
  return { total: result[0]?.metadata[0]?.total, items: result[0]?.data };
};
