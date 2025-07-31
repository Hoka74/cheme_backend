/** @module admin/ticket **/

const { paginationQuery } = require("../../../utils/paginationQuery");

// /**
//  * @param {object} filter
//  * */
// exports.get = async (filter) => {
//   const { role, page, count } = filter;
//   const result = await Ticket.aggregate([
//     { $sort: { createdAt: 1 } },
//     {
//       $lookup: {
//         from: "companies",
//         foreignField: "_id",
//         localField: "company",
//         as: "company",
//       },
//     },
//     {
//       $addFields: {
//         company: { $first: "$company" },
//       },
//     },
//     paginationQuery(page, count),
//   ]);
//   return result;
// };

// /**
//  * @param {object} filter
//  * @param {object} values
//  * */

// exports.update = async (filter, values) => {
//   const result = await Ticket.findOneAndUpdate(filter, values, {
//     runValidators: true,
//     new: true,
//   }).populate("company");
//   return result;
// };

// exports.isCloseHandler = async () => {
//   const hours = 24;
//   const ago = new Date(Date.now() - hours * 60 * 60 * 1000);

//   const result = await Ticket.updateMany(
//     {
//       $expr: {
//         $and: [
//           { $eq: ["$isClosed", false] },
//           { $ne: [{ $last: "$replies.admin" }, undefined] },
//           { $eq: [{ $last: "$replies.isClosed" }, true] },
//           {
//             $gt: [ago, { $last: "$replies.updatedAt" }],
//           },
//         ],
//       },
//     },
//     {
//       $set: {
//         isClosed: true,
//       },
//     }
//   ).catch(console.log);

//   return result;

//   // const result = await Ticket.findOneAndUpdate(filter, values, {
//   //   runValidators: true,
//   //   new: true,
//   // }).populate("company");
//   // return result;
// };

// // const result = await Ticket.aggregate([
// //   {
// //     $match: {
// //       isClosed: false,
// //     },
// //   },
// //   {
// //     $addFields: {
// //       lastReply: { $last: "$replies" },
// //     },
// //   },
// //   {
// //     $match: {
// //       "lastReply.admin": { $exists: true },
// //       "lastReply.isClosed": true,
// //     },
// //   },
// //   {
// //     $set: {
// //       isClosed: true,
// //     },
// //   },
// // ]);

// // console.log(result)
