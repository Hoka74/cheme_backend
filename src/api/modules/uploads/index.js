var fs = require("fs");
const path = require("path");
const express = require("express");
const async = require("../../middleware/async-handler");
const useAuth = require("../../middleware/auth-handler");
const {
  BadRequestException,
  ForbiddenException,
} = require("../../utils/errorResponse");

const router = express.Router();

const root = path.join(__dirname, `./../../../../uploads`);

router.get(
  "/companies/tickets/:company/:name",
  async(
    useAuth({ onlyManager: true, adminAccess: true })
  ),
  async(async (req, res) => {
    const { params, body, query } = req;
    const { name, company } = params;
    const { USER_DATA } = body;

    let cmp = "";

    const { companyId, roles } = USER_DATA;

    const isAdmin = roles.includes("admin");

    if (isAdmin) {
      cmp = company;
    } else {
      if (companyId !== company) {
        throw new ForbiddenException({ message: "not found" });
      }
      cmp = companyId;
    }

    const url = `${root}/companies/${cmp}/tickets/${name}`;
    const is = await fs.existsSync(url);
    if (is) {
      res.sendFile(url);
    } else {
      throw new BadRequestException({ message: "not found" });
    }
  })
);

router.get(
  "/*",
  async((req, res) => {
    throw new BadRequestException({ message: "not found" });
  })
);

module.exports = router;
