const mongoose = require("mongoose");
const { USER_ROLE, POSITION } = require("./constants");
const AccessSchema = require("./access.schema");

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: [USER_ROLE.admin, USER_ROLE.user],
      required: true,
    },
    phone: { type: String, required: true, unique: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    province: { type: mongoose.Schema.Types.ObjectId, required: false },
    city: { type: mongoose.Schema.Types.ObjectId, required: false },
    isBlocked: { type: Boolean, required: true, default: false },
    failedSignInCount: {
      type: Number,
      default: 0,
      select: false,
    },
    position: {
      role: { type: String, enum: [POSITION.manager, POSITION.clerk, POSITION.simple, POSITION.doctor] },
    },
    access: AccessSchema,
    referralCode: {type: String, required:false}
  },
  { timestamps: true }
);

const collectionName = "user";
const User = mongoose.model(collectionName, UserSchema);

module.exports = User;
