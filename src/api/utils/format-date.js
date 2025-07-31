/** @namespace utils.date */

/**
 *
 * @memberof utils.date
 * @param {Date} date
 * @param {string} separator
 * @returns
 */

function formatDate(date, separator = "-") {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${separator}${month}${separator}${day}`;
}

module.exports = formatDate;
