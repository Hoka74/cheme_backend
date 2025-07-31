/** @module admin/invoices **/

const { TRANSACTION_TYPE } = require("../../financialTransactions/constants");
const { INVOICE_TYPE } = require("../../invoice/constants");
const Invoice = require("../../invoice/invoice.schema");




/**
 * @param {object} filter
 * */
exports.get = async (filter) => {
  const { page, count, from, to, sort, mode, search, ...rest } = filter;
  let query = [];
  let filterMode = {};
  if(mode){
    if (mode == "wage") {
      filterMode = {
        $or: [
          { $and: [{ isBuy: true, invoiceType: INVOICE_TYPE.payment }] },
          { isWage: true },
        ],
      };
    } else if (mode == "sell") {
      filterMode = {
        $or: [
          { $and: [{ isBuy: false }, { invoiceType: INVOICE_TYPE.payment }] },
          {
            $and: [
              { isWage: false },
              { invoiceType: INVOICE_TYPE.buyAndSell },
              { isBuy: false },
            ],
          },
        ],
      };
    } else if (mode == "buy") {
      filterMode = {
        $or: [
          { $and: [{ isBuy: true, invoiceType: INVOICE_TYPE.payment }] },
          {
            $and: [
              { isWage: false },
              { invoiceType: INVOICE_TYPE.buyAndSell },
              { isBuy: true },
            ],
          },
        ],
      };
    }
  }

  if (search) {
    query.push({
      $addFields: {
        _idAsString: { $toString: "$_id" },
      },
    });
    query.push({
      $match: {
        _idAsString: { $regex: search, $options: "i" },
      },
    });
    query.push({
      $project: {
        _idAsString: 0,
      },
    });
  }
  if (rest && Object.keys(rest).length > 0) {
    query.push({ $match: { ...rest, ...filterMode } });
  }
  if (from) {
    // query.push({ $match: { dateTime: { $gte: new Date(from) } } });
    query.push({
      $match: {
        $expr: {
          $gte: [
            { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
            { $dateToString: { format: "%Y-%m-%d", date: new Date(from) } },
          ],
        },
      },
    });
  }
  if (to) {
    // query.push({ $match: { dateTime: { $lte: new Date(to) } } });
    query.push({
      $match: {
        $expr: {
          $lte: [
            { $dateToString: { format: "%Y-%m-%d", date: "$dateTime" } },
            { $dateToString: { format: "%Y-%m-%d", date: new Date(to) } },
          ],
        },
      },
    });
  }

  // Building the data query pipeline
  let dataQuery = [
    { $sort: sort || { dateTime: -1 } },
    { $skip: (page - 1) * count },
    { $limit: count },
    {
      $lookup: {
        from: "contacts",
        foreignField: "_id",
        localField: "contact",
        as: "contact",
      },
    },
    {
      $addFields: {
        contact: { $first: "$contact" },
      },
    },
    {
      $lookup: {
        from: "products",
        foreignField: "_id",
        localField: "product",
        as: "product",
      },
    },
    {
      $addFields: {
        product: { $first: "$product" },
      },
    },
    {
      $lookup: {
        from: "invoices",
        foreignField: "parentInvoice",
        localField: "_id",
        as: "children",
      },
    },
    {
      $lookup: {
        from: "invoices", // reference the same 'invoices' collection
        localField: "parentInvoice", // field from the current document
        foreignField: "_id", // field in the 'invoices' collection to match
        as: "parentInvoice", // output array field
      },
    },
    {
      $addFields: {
        parentInvoice: { $first: "$parentInvoice" },
      },
    },
    {
      $lookup: {
        from: "financialtransactions",
        // localField: "_id",
        // foreignField: "invoice",
        let: { invoiceId: "$_id" },
        as: "transactions",
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$transactionType", TRANSACTION_TYPE.invoice] },
                  { $eq: ["$invoice", "$$invoiceId"] },
                ],
              },
            },
          },
          {
            $lookup: {
              from: "financialaccounts",
              localField: "account",
              foreignField: "_id",
              as: "account",
            },
          },
          {
            $addFields: {
              account: { $first: "$account" },
            },
          },
          {
            $addFields: {
              POS: {
                $cond: {
                  if: { $ifNull: ["$POS", false] },
                  then: {
                    $first: {
                      $filter: {
                        input: "$account.poses",
                        as: "posid",
                        cond: { $eq: ["$$posid._id", "$POS"] },
                      },
                    },
                  },
                  else: "$$REMOVE",
                },
              },
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$outlays",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "financialtransactions",
        let: { outlaysField: "$outlays" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$outlay", "$$outlaysField._id"] }, // Match if 'outlay' equals 'outlays._id'
                  { $eq: [{ $type: "$outlay" }, "objectId"] }, // Ensure 'outlay' exists and is an ObjectId
                ],
              },
            },
          },
        ],
        as: "outlays.transaction",
      },
    },
    {
      $addFields: {
        "outlays.transaction": {
          $cond: {
            if: { $gt: [{ $size: "$outlays.transaction" }, 0] }, // Check if outlays.transaction is not empty
            then: { $first: "$outlays.transaction" }, // If not empty, take the first element
            else: null, // If empty, set it to null or any default value you want
          },
        },
      },
    },
    {
      $lookup: {
        from: "financialaccounts",
        localField: "outlays.transaction.account",
        foreignField: "_id",
        as: "outlays.transaction.account",
      },
    },
    {
      $addFields: {
        "outlays.transaction.account": {
          $cond: {
            if: { $gt: [{ $size: "$outlays.transaction.account" }, 0] }, // Check if outlays.transaction.account is an array with items
            then: { $first: "$outlays.transaction.account" }, // If it has items, take the first account
            else: null, // If empty, set it to null or any default value you want
          },
        },
      },
    },
    {
      $group: {
        _id: "$_id",
        otherFields: { $first: "$$ROOT" },
        outlays: {
          $push: "$outlays",
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$otherFields", { outlays: "$outlays" }],
        },
      },
    },
    { $sort: sort || { dateTime: -1 } },
  ];

  // Adding the $facet stage with metadata and data query
  query.push({
    $facet: {
      metadata: [{ $count: "total" }],
      data: dataQuery,
    },
  });

  // Executing the aggregate query
  const result = await Invoice.aggregate(query);
  return result;
};