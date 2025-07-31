/** @namespace utils.text */

/**
 * @memberof utils.text
 * @param {string} value
 * */
const firstLetterCapitalize = (value) => {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLocaleLowerCase();
};

module.exports = firstLetterCapitalize;
