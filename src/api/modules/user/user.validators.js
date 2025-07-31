const { body, header, checkSchema } = require("express-validator");
const validate = require("../../middleware/validate-handler");
const { USER_LANGUAGE } = require("./constants");

exports.update = validate([
  body("firstName").isString().toLowerCase().optional(),
  body("lastName").isString().toLowerCase().optional(),
  body("city").isString().optional(),
  body("province").isString().optional(),
  body("referralCode").isString().optional()
]);
