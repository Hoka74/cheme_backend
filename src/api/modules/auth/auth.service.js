/** @module auth **/

const { createToken } = require("../../../lib/jwt.lib");

/**
 * @param {string} userId
 * @param {string} role
 * */
exports.createAuthTokenForClient = (userId, role, userAgent) => {
  const payload = {
    userId,
    role,
    userAgent,
  };
  return createToken(payload, "AUTH");
};

exports.createAuthRefreshTokenForClient = (userId, role) => {
  const payload = {
    userId,
    role,
  };
  return createToken(payload, "AUTH_REFRESH_TOKEN");
};
