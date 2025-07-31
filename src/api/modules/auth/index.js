const express = require("express");
const async = require("../../middleware/async-handler");
const useAuth = require("../../middleware/auth-handler");
const authController = require("./auth.controller");
const authValidators = require("./auth.validators");

const router = express.Router();

/**
 * @swagger
 *   paths:
 *     /auth/sign-in:
 *       post:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - auth
 *         summary: register
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *         responses:
 *           '200':
 *             description: OK
 */
router.post(
  "/sign-in",
  // async(authValidators.signIn),
  async(authController.signIn)
);

/**
 * @swagger
 *   paths:
 *     /auth/refreshToken:
 *       post:
 *         tags:
 *          - auth
 *         summary: refresh token
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                   refreshToken:
 *                     type: string
 *         responses:
 *           '200':
 *             description: OK
 */
// router.post(
//   "/refresh-token",
//   async(authValidators.refreshTokenValidator),
//   async(useAuth({ onlyRefreshToken: true })),
//   async(authController.refreshToken)
// );


/**
 * @swagger
 *   paths:
 *     /auth/verify:
 *       post:
 *         tags:
 *          - auth
 *         summary: verify
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                   phone:
 *                     type: string
 *                   verificationCode:
 *                     type: string
 *         responses:
 *           '200':
 *             description: OK
 */
router.post("/verification",
  async(authValidators.verifyValidator),
  async(authController.verify)
)

module.exports = router;
