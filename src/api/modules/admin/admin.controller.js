/** @module admin **/

const express = require("express");
const mongoose = require("mongoose");
const services = require("./services");
const { getFilter, getPagination } = require("../../utils/request");
const { setupPagination } = require("../../utils/paginationQuery");
const { ErrorResponse } = require("../../utils/errorResponse");
const { errors } = require("../../constants/errors");
/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.createCompany = async (req, res) => {
  const { name } = req.body;
  // const comp = await companyService.createCompany({ name });
  // res.json(comp);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getValidation = async (req, res) => {
  res.json({ check: "correct" });
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getAllPackages = async (req, res) => {
  const packages = await services.AppPackage.getPackagesForAdmin();
  res.json(packages);
};

exports.getUsers = async (req, res) => {
  const result = await services.userServices.getUsersWithAggregation();
  // console.log(result);
  res.json(result);
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getTransactions = async (req, res) => {
  let filter = getFilter(req);

  const pagination = getPagination(req);
  if (filter.user) {
    filter.user = new mongoose.Types.ObjectId(filter.user);
  }

  const result = await services.Transactions.getTransactions({
    ...filter,
    ...pagination,
  });
  res.json(setupPagination(result));
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.createEvent = async (req, res) => {};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.createPackage = async (req, res) => {};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.getInvoices = async (req, res) => {
  // const { USER_DATA } = req.body;

  let filter = getFilter(req);

  // if (!filter.mode) {
  //   throw new ErrorResponse.ConflictException({
  //     message: errors.modeCategoryNotFound,
  //   });
  // }

  const pagination = getPagination(req);
  if (filter.user) {
    filter.user = new mongoose.Types.ObjectId(filter.user);
  }
  if (filter.company) {
    filter.company = new mongoose.Types.ObjectId(filter.company);
  }
  if (filter.contact) {
    filter.contact = new mongoose.Types.ObjectId(filter.contact);
  }
  if (filter.product) {
    filter.product = new mongoose.Types.ObjectId(filter.product);
  }

  const result = await services.Invoices.get({ ...filter, ...pagination });
  res.json(setupPagination(result));
};

// /**

//  * @param {express.Request} req
//  * @param {express.Response} res
//  */
// exports.createCompanyInvitation = async (req, res) => {
//   const { email, role, additionalData, name, lastName } = req.body;
//   const { companyId } = req.params;

//   // check company
//   const company = await companyService.getById(companyId);
//   if (!company)
//     throw new BadRequestException({
//       message: `company with id:${companyId} not found`,
//     });
//   if (company.status === COMPANY_STATUS.blocked)
//     throw new BadRequestException({
//       message: `company:${company?.name} is blocked`,
//     });
//   //

//   // check user
//   const user = await userService.findOne({ email }, "");
//   if (user)
//     throw new BadRequestException({
//       message: `a user with this email:${email} has already been registered.`,
//     });
//   //

//   const invite = await companyInvitationService.createCompanyInvitation({
//     sender: USER_DATA.userId,
//     senderRole: "admin",
//     name,
//     lastName,
//     email,
//     role,
//     company: companyId,
//     department: "",
//     jobPosition: "",
//   });

//   const token = createToken(
//     {
//       id: invite._id,
//     },
//     "INVITATION"
//   );

//   const fullName = `${name} ${lastName}`;
//   const template = emailTemplate({
//     ...ADMIN_TO_USER_TEMPLATE,
//     name: fullName,
//     link: `${HOST}/register/sign-up/${token}`,
//   });

//   // remove
//   console.log(`${HOST}/register/sign-up/${token}`);

//   await sendMail({
//     to: email,
//     template,
//     subject: `${company.name} to ${COMPANY_NAME} ${"registration"}`,
//   });

//   const data = invite.toJSON();

//   res.json(data);
// };

// /**
//  * @param {express.Request} req
//  * @param {express.Response} res
//  */
// exports.adminUpdateLastSeenDate = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await services.ticketServices.update(
//     { _id: id },
//     { adminLastSeenDate: new Date() }
//   );

//   if (!result) new BadRequestException({ message: "ticket not found" });

//   res.json(result);
// };

// /**
//  * @param {express.Request} req
//  * @param {express.Response} res
//  */
// exports.adminInitiateTags = async (req, res, next) => {
//   const { tags } = req.body;

//   const publicAddresses = tags.map((tag) => ({
//     publicAddress: tag.publicAddress,
//     "reason.id": "0",
//   }));

//   tags.forEach((item, index) => {
//     let newItems = [...tags].splice(0, index).map((i) => i.publicAddress);
//     const find = newItems.find((p) => p === item.publicAddress);
//     if (find) throw new BadRequestException();
//   });

//   const items = await MovedTag.find({ $or: publicAddresses });

//   if (items.length) {
//     throw new BadRequestException({ data: items.map((i) => i.publicAddress) });
//   } else {
//     const result = await services.movedTagServices.setupTags(
//       tags.map((tag) => ({ ...tag, reason: { id: "0" } }))
//     );
//     res.json({ items: result });
//   }
// };
