/** @module admin/transactions **/

const { paginationQuery } = require("../../../utils/paginationQuery");
const BankTransaction = require("../../bankTransaction/bankTransaction.schema");

exports.getTransactions = async (filter)=>{
  const { sort, page, count, from, to, ...rest } = filter;
  
  let query = [];
  query.push({ $match: rest });
  if (from) {
    // query.push({ $match: { dateTime: { $gte: new Date(from) } } });
    query.push({
      $match: {
        $expr: {
          $gte: [
            { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
            { $dateToString: { format: "%Y-%m-%d", date: new Date(from) } }
          ]
        }
      }
    });
  }
  if (to) {
    // query.push({ $match: { dateTime: { $lte: new Date(to) } } });
    query.push({
      $match: {
        $expr: {
          $lte: [
            { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
            { $dateToString: { format: "%Y-%m-%d", date: new Date(to) } }
          ]
        }
      }
    });
  }
  const dataQuery = [
    { $sort: sort || { dateTime: -1 } },
    { $skip: (page - 1) * count },
    { $limit: count },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $addFields: {
        user: { $first: "$user" },
      },
    },
    {
      $lookup: {
        from: "provinces",
        localField: "user.province",
        foreignField: "_id",
        as: "province",
      },
    },
    {
      $addFields: {
        "user.province": { $first: "$province" },
      },
    },
    // Join city
    {
      $lookup: {
        from: "cities",
        localField: "user.city",
        foreignField: "_id",
        as: "city",
      },
    },
    {
      $addFields: {
        "user.city": { $first: "$city" },
      },
    },
    
    {
      $project: {
        city: 0, province: 0
      }
    },
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
  ];
  query.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: dataQuery,
    },
  });
  return await BankTransaction.aggregate(query);
};
