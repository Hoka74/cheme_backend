const { body } = require("express-validator");
const validate = require("../../middleware/validate-handler");

exports.createEvent = validate(
    [
        body("title").isString().notEmpty(),
        body("endDateTime").toDate().notEmpty(),
    ]
);

// exports.createCompany = validate([body("name").isLength({ min: 2 })]);

// exports.createInvitation = validate([
//   body("email").notEmpty().isEmail().toLowerCase(),
//   body("role")
//     .notEmpty()
//     .isString()
//     .isIn([COMPANY_INVITATION_ROLE.employee, COMPANY_INVITATION_ROLE.manager]),
//   body("name").isString().notEmpty(),
//   body("lastName").isString().notEmpty(),
// ]);

// exports.createInvitation = validate([
//   body("name").isString().isLength({ min: 2 }),
//   body("lastName").isString().isLength({ min: 2 }),
//   body("status")
//     .notEmpty()
//     .isString()
//     .isIn([
//       COMPANY_STATUS.active,
//       COMPANY_STATUS.inactive,
//       COMPANY_STATUS.blocked,
//     ]),
// ]);

// exports.createReportAccessServiceValidation = validate([
//   body("name").isString().isLength({ min: 2 }).toLowerCase(),
//   body("action").isString().isLength({ min: 2 }).toLowerCase(),
//   body("description").isString().optional(),
//   body("isEnabled").isBoolean(),
// ]);

// exports.updatUserValidator = validate([
//   body("name").isString().isLength({ min: 2 }).toLowerCase(),
//   body("lastName").isString().isLength({ min: 2 }).toLowerCase(),
//   body("isBlocked").isBoolean(),
//   body("roles").isArray(),
//   body("phone").isString(),
// ]);

// exports.updateAdminSetting = validate([
//   body("tagReportSettings").isObject().notEmpty(),
//   body("tagReportSettings.validDuration").isNumeric().notEmpty(),
//   body("tagReportSettings.batteryEstimatedLifeFormula").isString().notEmpty(),
//   body("tagReportSettings.voltageToPercentageDictionary").isArray().notEmpty(),
//   body("tagReportSettings.voltageToPercentageDictionary.*.voltage")
//     .isNumeric()
//     .notEmpty(),
//   body("tagReportSettings.voltageToPercentageDictionary.*.value")
//     .isNumeric()
//     .notEmpty(),
// ]);

// exports.initiateMovedTagsValidator = validate([
//   body("tags").isArray().notEmpty(),
//   body("tags.*.company").isString().notEmpty(),
//   body("tags.*.publicAddress").isString().notEmpty(),
//   body("tags.*.data.tagBatteryExpireDate").toDate(),
//   body("tags.*.data.productName").isString().optional(),
// ]);
