const { default: mongoose } = require("mongoose");

const AccessSchema = new mongoose.Schema(
  {
    type: {
      isBlocked: Boolean,
      isWrite: Boolean,
      isDelete: Boolean,
      isEdit: Boolean,
    },
    default: {
      isBlocked: false,
      isWrite: false,
      isDelete: false,
      isEdit: false,
    },
  },
  { timestamps: true, _id: true }
);

module.exports = AccessSchema;
