/** @namespace middleware.validateHandler */

const { validationResult } = require("express-validator");
const { UnprocessableEntity } = require("../utils/errorResponse");

/**
 * @memberof middleware.validateHandler
 * @param {any[]} validations
 */
const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      await validation.run(req);
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    throw new UnprocessableEntity({
      message: undefined,
      data: undefined,
      errors: errors.array(),
    });
  };
};

module.exports = validate;
