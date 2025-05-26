const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true, sparse: true },
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // for local signup
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  loginCount: { type: Number, default: 0 },
  loginLogs: [
    {
      date: { type: Date, default: Date.now },
      message: { type: String },
    },
  ],
  resetCode: { type: String },
  resetCodeExpires: { type: Date },
  archived: { type: Boolean, default: false }, // Add archived flag
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
