const express = require("express");
const router = express.Router();
const logger = require("./middleware/logger-handler");
const errorHandler = require("./middleware/error-handler");

router.use(logger);
router.use(express.json());

router.use("/auth", require("./modules/auth"));
router.use("/users", require("./modules/user"));
router.use("/locations", require("./modules/location"));

router.use(errorHandler);

module.exports = router;
