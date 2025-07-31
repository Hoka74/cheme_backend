/** @module lib **/

const jwt = require("jsonwebtoken");
const JWT_KEY_AUTH = process.env.JWT_KEY_AUTH;
const JWT_INVITATION_AUTH = process.env.JWT_INVITATION_AUTH;

const config = {
  AUTH: {
    expiresIn: "1d",
    key: JWT_KEY_AUTH,
  },
  AUTH_REFRESH_TOKEN: {
    expiresIn: "7d",
    key: JWT_KEY_AUTH,
  },
  INVITATION: {
    expiresIn: "7d",
    key: JWT_INVITATION_AUTH,
  },
};

/**
 * @param {any} payload
 * @param {"INVITATION" | "AUTH"| "FORGET_PASSWORD"| "AUTH_REFRESH_TOKEN"} type
 */
module.exports.createToken = (payload, type) => {
  // @ts-ignore
  return jwt.sign(payload, config[type].key, {
    expiresIn: config[type].expiresIn,
  });
};

/**
 * @param {string} token
 * @param {"INVITATION" | "AUTH" | "FORGET_PASSWORD"} type
 */
module.exports.verifyToken = (token, type) => {
  // @ts-ignore
  return jwt.verify(token, config[type].key);
};
