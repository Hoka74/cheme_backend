const express = require("express");
const async = require("../../middleware/async-handler");
const useAuth = require("../../middleware/auth-handler");
const adminController = require("./admin.controller.js");
const adminValidators = require("./admin.validators");
const multer = require("multer");
var fs = require("fs");

const { UnprocessableEntity } = require("../../utils/errorResponse.js");

const router = express.Router();

// const storage = multer.diskStorage({
//   destination: async (req, file, callback) => {
//     // @ts-ignore
//     const { body } = req;

//     const companyId = body.companyId;

//     if (!companyId) {
//       return callback(
//         new UnprocessableEntity({
//           message: "companyId is required",
//         }),
//         ""
//       );
//     }

//     const uploadDire =
//       __dirname + `./../../../../uploads/companies/${companyId}/tickets`;

//     const root = `uploads/companies/${companyId}/tickets`;

//     const is = await fs.existsSync(root);
//     if (!is) {
//       await fs.mkdirSync(root, { recursive: true });
//     }
//     return callback(null, uploadDire);
//   },
//   filename: (req, file, callback) => {
//     callback(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const fileFilter = (req, file, cb) => {
//   // Reject a file
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/webp" ||
//     file.mimetype === "image/png"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("File type not supported"));
//   }
// };

// const uploads = multer({
//   storage: storage,
//   fileFilter,
//   limits: { fileSize: 52428800 },
// });

router.use(async(useAuth({ onlyAdmin: true })));

/*

companies

*/

/**
 * @swagger
 *   paths:
 *     /admin/companies:
 *       post:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: admin create company
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                    name:
 *                        type: string
 *         responses:
 *           '200':
 *             description: OK
 */
// router.post(
//   "/companies",
//   async(adminValidators.createCompany),
//   async(adminController.createCompany)
// );

router.get("/", async(adminController.getValidation));

router.get("/get-packages", async(adminController.getAllPackages));
router.post(
  "create-event",
  async(adminValidators.createEvent),
  async(adminController.createEvent),
);

router.get('/users',async(adminController.getUsers));
router.get('/transactions', async(adminController.getTransactions));
router.get('/invoices', async(adminController.getInvoices));
/**
 * @swagger
 *   paths:
 *     /admin/companies:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get companies
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/companies", async(adminController.searchCompanies));

/**
 * @swagger
 *   paths:
 *     /admin/companies/:companyId/:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get company by id
 *         parameters:
 *              - in: path
 *                name: companyId
 *                required: true
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/company/:id", async(adminController.getCompanyById));

/**
 * @swagger
 *   paths:
 *     /admin/companies/invitations/:companyId:
 *       post:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: create invitation (email) for the company
 *         parameters:
 *              - in: path
 *                name: companyId
 *                required: true
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                      email:
 *                          type: string
 *                      role:
 *                          type: string
 *                          enum: [employee, manager]
 *                      name:
 *                          type: string
 *                      lastName:
 *                          type: string
 *         responses:
 *           '200':
 *             description: OK
 */
// router.post(
//   "/companies/invitations/:companyId",
//   async(adminValidators.createInvitation),
//   async(adminController.createCompanyInvitation)
// );

/**
 * @swagger
 *   paths:
 *     /admin/companies/invitations/:companyId:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get invitations
 *         parameters:
 *              - in: path
 *                name: companyId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get(
//   "/companies/invitations/:companyId",
//   async(adminController.searchInvitations)
// );

/**
 * @swagger
 *   paths:
 *     /admin/companies/members:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get members of companies
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/companies/members", async(adminController.searchMembers));

/**
 * @swagger
 *   paths:
 *     /admin/companies/:id:
 *       patch:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: update company by id
 *         parameters:
 *              - in: path
 *                name: companyId
 *                required: true
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *         responses:
 *           '200':
 *             description: OK
 */
// router.patch("/companies/:id", async(adminController.updateCompany));
/*






*/

/* projects */

/**
 * @swagger
 *   paths:
 *     /admin/projects/companies/:companyId:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: update company by id
 *         parameters:
 *              - in: path
 *                name: companyId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get(
//   "/projects/companies/:companyId",
//   async(adminController.adminGetProjects)
// );

/* areas */

/**
 * @swagger
 *   paths:
 *     /admin/areas/projects/:projectId:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get areas by projectId
 *         parameters:
 *              - in: path
 *                name: projectId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/areas/projects/:projectId", async(adminController.adminGetAreas));

/*






*/
/* report-access */

// /**
//  * @swagger
//  *   paths:
//  *     /admin/report-access:
//  *       get:
//  *         tags:
//  *          - admin
//  *         summary: get report access
//  *         responses:
//  *           '200':
//  *             description: OK
//  */
// router.get("/report-access", async(adminController.searchReportAccess));

// /**
//  * @swagger
//  *   paths:
//  *     /admin/report-access:
//  *       post:
//  *         tags:
//  *          - admin
//  *         summary: add
//  *         requestBody:
//  *           content:
//  *             application/json:
//  *               schema:      # Request body contents
//  *                 type: object
//  *         responses:
//  *           '200':
//  *             description: OK
//  */
// router.post(
//   "/report-access",
//   async(adminValidators.createReportAccessServiceValidation),
//   async(adminController.createReportAccess)
// );

// router.patch(
//   "/report-access/:id",
//   async(adminValidators.createReportAccessServiceValidation),
//   async(adminController.updateReportAccess)
// );

/**
 *
 *
 * users
 *
 */

/**
 * @swagger
 *   paths:
 *     /admin/users:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get users
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/users", async(adminController.getUsers));

/**
 * @swagger
 *   paths:
 *     /admin/users/:id:
 *       patch:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: update user by id
 *         parameters:
 *              - in: path
 *                name: userId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.patch("/users/:id", async(adminController.updateUser));

/**
 * @swagger
 *   paths:
 *     /admin/settings:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: get settings for admin
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/settings", async(adminController.getSettings));

/**
 * @swagger
 *   paths:
 *     /admin/settings:
 *       patch:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - admin
 *         summary: update admin settings
 *         requestBody:
 *            content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                        tagReportSettings:
 *                            type: object
 *                            properties:
 *                                validDuration:
 *                                    type: number
 *                                batteryEstimatedLifeFormula:
 *                                    type: string
 *                                voltageToPercentageDictionary:
 *                                    type: array
 *                                    items:
 *                                      type: object
 *                                      properties:
 *                                        voltage:
 *                                          type: number
 *                                          required: true
 *                                        value:
 *                                          type: number
 *                                          required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.patch(
//   "/settings",
//   async(adminValidators.updateAdminSetting),
//   async(adminController.updateSettings)
// );

// router.post(
//   "/set-all-project-and-area-active",
//   async(adminController.setAllProjectAndAreaActive)
// );
/*






Tickets:

*/

/**
 * @swagger
 *   paths:
 *     /admin/tickets:
 *       get:
 *         tags:
 *          - admin
 *         summary: get tickets
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/tickets", async(adminController.getTickets));

// create reply

/**
 * @swagger
 *   paths:
 *     /admin/tickets/:id/reply:
 *       put:
 *         tags:
 *          - admin
 *         summary: reply ticket "One of the files and caption fields is required."
 *         parameters:
 *              - in: path
 *                name: ticketId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.put(
//   "/tickets/:id/reply",
//   async(useAuth({})),
//   async(uploads.array("files")),
//   async(adminController.adminCreateReply)
// );

/**
 * @swagger
 *   paths:
 *     /admin/tickets/:id/last-seen-date:
 *       put:
 *         tags:
 *          - admin
 *         summary: update lat seen
 *         parameters:
 *              - in: path
 *                name: ticketId
 *                required: true
 *         responses:
 *           '200':
 *             description: OK
 */
// router.put(
//   "/tickets/:id/last-seen-date",
//   async(adminController.adminUpdateLastSeenDate)
// );

/**
 * @swagger
 *   paths:
 *     /admin/tickets/isClose-handler:
 *       post:
 *         tags:
 *          - admin
 *         summary: close tickets
 *         responses:
 *           '200':
 *             description: OK
 */
// router.post(
//   "/tickets/isClose-handler",
//   async(adminController.adminTicketsIsCloseHandler)
// );

/*

moved-tags:

*/

/**
 * @swagger
 *   paths:
 *     /admin/moved-tags/initiate:
 *       post:
 *         tags:
 *          - admin
 *         summary: register tags in moved-tags
 *         content:
 *            application/json:
 *                schema:
 *                    type: object
 *                    properties:
 *                        tags:
 *                            type: array
 *                            items:
 *                                company:
 *                                    type: string
 *                                publicAddress:
 *                                    type: string
 *                                data:
 *                                    type: object
 *                                    properties:
 *                                        tagBatteryExpireDate:
 *                                            type: date
 *                                        productName:
 *                                            type: string
 *                                            required: false
 *         responses:
 *           '200':
 *             description: OK
 */
// router.post(
//   "/moved-tags/initiate",
//   async(adminValidators.initiateMovedTagsValidator),
//   async(adminController.adminInitiateTags)
// );

/*

tags:

*/

/**
 * @swagger
 *   paths:
 *     /admin/tags:
 *       get:
 *         tags:
 *          - admin
 *         summary: get tags
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/tags", async(adminController.adminSearchTags));

/*

moved-tags:

*/

/**
 * @swagger
 *   paths:
 *     /admin/moved-tags:
 *       get:
 *         tags:
 *          - admin
 *         summary: get moved-tags
 *         responses:
 *           '200':
 *             description: OK
 */
// router.get("/moved-tags", async(adminController.adminSearchMovedTags));

module.exports = router;
