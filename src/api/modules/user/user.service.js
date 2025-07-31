/** @module user **/

const { default: mongoose } = require("mongoose");
const { hashHandler } = require("../../utils/hashHandler");
const User = require("./user.schema");

/**
 * @param {Object} data
 * @param {String} data.phone
 * @param {"admin"|"user"} data.role
 * @returns {Promise}
 * */
exports.create = async (data) => {
  const result = await User.create(data);
  return result.toJSON();
};

/**
 * @param {string} id
 * @param {object} values
 * @returns {Promise}
 * */
exports.update = async (id, values) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: values },
    { new: true }
  );
  return result?.toJSON();
};

/**
 * @param {object} id
 * @returns {Promise}
 * */
exports.incrementFailedSignInCount = async (id) => {
  const result = await User.findOneAndUpdate(
    { _id: id },
    {
      $inc: { failedSignInCount: 1 }, // Increment failedSignInCount by 1
    },
    { new: true }
  );
  return result?.toJSON();
};

/**
 * @param {object} id
 * @returns {Promise}
 * */
exports.resetFailedSignInCount = async (id) => {
  const result = await User.findByIdAndUpdate(
    id,
    { $set: { failedSignInCount: 0 } },
    { new: true }
  );
  return result?.toJSON();
};

/**
 * @param {object} filter
 * @param {mongoose.Types.ObjectId=} filter._id
 * @param {String=} filter.phone
 * @returns {Promise}
 */
exports.findOne = async (filter) => {
  const users = await User.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "companies",
        localField: "company",
        foreignField: "_id",
        as: "company",
      },
    },
    {
      $addFields: {
        company: { $first: "$company" },
      },
    },
    {
      $lookup: {
        from: "provinces",
        localField: "province",
        foreignField: "_id",
        as: "province",
      },
    },
    {
      $addFields: {
        province: { $first: "$province" },
      },
    },
    //
    {
      $lookup: {
        from: "cities",
        localField: "city",
        foreignField: "_id",
        as: "city",
      },
    },
    {
      $addFields: {
        city: { $first: "$city" },
      },
    },
  ]);
  if (users.length) {
    return users[0];
  }

  return null;
};
