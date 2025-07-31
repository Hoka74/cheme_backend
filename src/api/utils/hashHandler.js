/** @namespace utils.hash */

const { randomBytes, scrypt: _scrypt } = require("crypto");
const { promisify } = require("util");
const scrypt = promisify(_scrypt);

/**
 * hash password
 * @memberof utils.hast
 * @param {string} password
 * */
const hashHandler = async (password) => {
  const salt = randomBytes(8).toString("hex");
  // Hash the salt and the password together
  const hash = await scrypt(password, salt, 32);
  // Join the hashed result and the salt together
  const result = salt + "." + hash.toString("hex");
  return result;
};

/**
 * check if password is correct
 * @memberof utils.hast
 * @param {string} password
 * @param {string} storedPassword
 * */
const checkHashedPassword = async (password, storedPassword) => {
  const [salt, storedHash] = storedPassword.split(".");
  const hash = await scrypt(password, salt, 32);
  if (storedHash !== hash.toString("hex")) return false;
  return true;
};

module.exports = { hashHandler, checkHashedPassword };
