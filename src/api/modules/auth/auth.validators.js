const { body } = require("express-validator");
const validate = require("../../middleware/validate-handler");
const { USER_LANGUAGE } = require("../user/constants");

exports.signIn = validate([
  body("email").isEmail().toLowerCase(),
  body("password").isLength({ min: 8 }),
]);
exports.verifyValidator = validate([
  body("verificationCode").notEmpty(),
  body("phone").isLength({min: 11, max: 11})
])
// "invitationId": "647ed7ed1a17d9dc993eb214",
// "name": "john",
// "lastName": "moye",
// "department": "financial",
// "jopPosition": "cashier",
// "phone": "123123",
// "language": "123123",
// "password": "123123"
exports.signUp = validate([
  // invitationId
  body("invitationToken").notEmpty(),
  //
  body("name").isString().isLength({ min: 2 }).notEmpty().toLowerCase(),
  body("lastName").isString().isLength({ min: 2 }).notEmpty().toLowerCase(),
  body("phone").isString().notEmpty(),
  body("language").isString().isIn([USER_LANGUAGE.en, USER_LANGUAGE.fr]),
  body("password").isLength({ min: 8 }),
  //
  body("department").isString().notEmpty().toLowerCase(),
  body("jobPosition").isString().notEmpty().toLowerCase(),
]);
