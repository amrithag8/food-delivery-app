const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: {type: Object, default:{}}
  },
  {minimize:false},
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
