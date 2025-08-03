const express = require("express");
const async = require("../../middleware/async-handler");

const useAuth = require("../../middleware/auth-handler");
const { getProvinces, getCities } = require("./location.controller");

const router = express.Router();

// router.use(async(useAuth({})));

/**
 * @swagger
 *   paths:
 *     /locations/provinces:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - companies
 *         summary: Get your provinces
 *         responses:
 *           '200':
 *             description: OK
 */

router.get("/provinces", 
  // async(useAuth({})),
   async(getProvinces));

/**
 * @swagger
 *   paths:
 *     /locations/cities/:id:
 *       get:
 *         security:
 *          - bearerAuth: []
 *         tags:
 *          - companies
 *         summary: Get your cities/:id
 *         responses:
 *           '200':
 *             description: OK
 */

router.get("/cities/:id", 
  // async(useAuth({})),
   async(getCities));

module.exports = router;
