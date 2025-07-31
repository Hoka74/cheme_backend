/** @module admin/user **/

const { paginationQuery } = require("../../../utils/paginationQuery");
const User = require("../../user/user.schema");

/**
 * @param {object} filter
 * */
exports.get = async (filter) => {
  const { role, page, count } = filter;
  const result = await User.aggregate([
    // {
    //   $match: filter,
    // },
    {
      $lookup: {
        as: "companyMember",
        from: "company-members",
        foreignField: "user",
        localField: "_id",
      },
    },
    {
      $addFields: {
        companyMember: { $first: "$companyMember" },
      },
    },
    {
      $lookup: {
        as: "companyMember.company",
        from: "companies",
        foreignField: "_id",
        localField: "companyMember.company",
      },
    },
    {
      $addFields: {
        "companyMember.company": { $first: "$companyMember.company" },
      },
    },
    paginationQuery(page, count),
  ]);
  return result;
};

exports.getUsersWithAggregation = async () => {
  // const result = await User.aggregate([
  //   {
  //     $lookup: {
  //       from: "provinces",
  //       localField: "province",
  //       foreignField: "_id",
  //       as: "province",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       province: { $first: "$province" },
  //     },
  //   },
  //   //
  //   {
  //     $lookup: {
  //       from: "cities",
  //       localField: "city",
  //       foreignField: "_id",
  //       as: "city",
  //     },
  //   },
  //   {
  //     $addFields: {
  //       city: { $first: "$city" },
  //     },
  //   },
  // ]);
  const result = await User.aggregate([
    // Join province
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
    // Join city
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

    // Lookup the last bank transaction for each user
    {
      $lookup: {
        from: "banktransactions",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$user", "$$userId"] } } },
          { $sort: { createdAt: -1 } },
          { $limit: 1 },

          // Join the package inside the transaction
          {
            $lookup: {
              from: "apppackages",
              localField: "package",
              foreignField: "_id",
              as: "package",
            },
          },
          {
            $addFields: {
              package: { $first: "$package" },
            },
          },
        ],
        as: "lastTransaction",
      },
    },
    {
      $addFields: {
        lastTransaction: { $first: "$lastTransaction" },
      },
    },
  ]);
  return result;
};
