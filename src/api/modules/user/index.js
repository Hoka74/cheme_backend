const express = require("express");
const async = require("../../middleware/async-handler");

const { updateUser, getMe } = require("./user.controller");
const userValidators = require("./user.validators");
const useAuth = require("../../middleware/auth-handler");

const router = express.Router();

// router.use(async(useAuth({})));

/**
 * @swagger
 *   paths:
 *     /users/me:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - users
 *         summary: get your info
 *         responses:
 *           '200':
 *             description: OK
 */

router.get("/me", async(useAuth({})), async(getMe));

/**
 * @swagger
 *   paths:
 *     /users:
 *       patch:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - users
 *         summary: Adds a new user
 *         requestBody:
 *           content:
 *             application/json:
 *               schema:      # Request body contents
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   phone:
 *                      type: string
 *                   language:
 *                      type: string
 *         responses:
 *           '200':
 *             description: OK
 */

router.patch(
  "/",
  async(useAuth({})),
  async(userValidators.update),
  async(updateUser)
);

module.exports = router;
