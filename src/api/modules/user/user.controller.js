/** @module user **/

const { default: mongoose } = require("mongoose");
const ErrorResponse = require("../../utils/errorResponse");
const userServices = require("./user.service");
const { errors } = require("../../constants/errors");

exports.getUserById = async (req, res) => {};

exports.getMe = async (req, res) => {
  const { USER_DATA } = req.body;
  console.log("USER_DATA : ",USER_DATA);
  const userId = new mongoose.Types.ObjectId(USER_DATA._id);
  console.log(userId);
  const user = await userServices.findOne({ _id: userId });

  if (!user?._id) {
    throw new ErrorResponse.UnauthorizedException({message: errors.userNotExists});
  }

  if (user.isBlocked) {
    throw new ErrorResponse.ForbiddenException({message: errors.userBlocked});
  }

  res.json(user);
};

exports.getUsers = async (req, res) => {};

exports.updateUser = async (req, res) => {
  const { firstName, lastName, city, province, referralCode, USER_DATA } = req.body;

  const { _id } = USER_DATA;

  const users = await userServices.update(_id, {
    firstName,
    lastName,
    city,
    province,
    referralCode
  });

  res.json(users);
};
