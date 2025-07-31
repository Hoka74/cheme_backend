const express = require("express");
const logger = require("./middleware/logger-handler");
const errorHandler = require("./middleware/error-handler");
const cors = require("cors");
const helmet = require("helmet");
const router = express.Router();

/**
 * @swagger
 *  components:
 *      securitySchemes:
 *          bearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *      security:
 *           - bearerAuth: []
 * */

/**
 * @swagger
 *  tags:
 *   - name: auth
 *   - name: users
 *   - name: companies
 *   - name: company-invitations
 *   - name: company-members
 *   - name: company-projects
 *   - name: project-areas
 *   - name: tags
 *   - name: moved-tags
 *   - name: report-access
 *   - name: admin
 * */

// const corsOptions = {
//     origin: "http://localhost:3000", // Replace with your frontend's URL
//     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     credentials: true, // If you're dealing with cookies or HTTP authentication
//     optionsSuccessStatus: 204
//   };

const corsOptions = {
    origin: '*', // Allows all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['*'],
    credentials: true, // If you use cookies or authentication
  }

router.use(logger);
// router.use(cors(corsOptions));
router.use(cors(corsOptions));
// @ts-ignore
router.use(helmet());

// router.options("*", cors({
//     origin: '*', // Allows all origins
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true, // If you use cookies or authentication
//   }));

router.use(express.json());
// router.use(express.urlencoded({ extended: true }));
// router.use('/admin', require("./modules/admin"));
router.use("/auth", require("./modules/auth"));
router.use("/users", require("./modules/user"));
router.use("/locations", require("./modules/location"));

router.use(errorHandler);
module.exports = router;
