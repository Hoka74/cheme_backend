const { default: mongoose } = require("mongoose");

// const AccessSchema = new mongoose.Schema(
//   {
//     type: {
//       isBlocked: Boolean,
//       isWrite: Boolean,
//       isDelete: Boolean,
//       isEdit: Boolean,
//     },
//     default: {
//       isBlocked: false,
//       isWrite: false,
//       isDelete: false,
//       isEdit: false,
//     },
//   },
//   { timestamps: true, _id: true }
// );

// module.exports = AccessSchema;
// const { default: mongoose } = require("mongoose");

const AccessSchema = new mongoose.Schema(
  {
    isBlocked: { type: Boolean, default: false },
    isWrite: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false },
    isEdit: { type: Boolean, default: false },
  },
  { timestamps: true, _id: true }
);

module.exports = AccessSchema;