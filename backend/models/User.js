const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    required,
  },
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },

  email: {
    type: String,
    required: [true, "Please enter your mail"],
    validate: [validator.isEmail, "Please enter your valid email"],
    unique: true,
  },

  //   phone: {
  //     type: Number,
  //     required: [true, "Please enter your contact"],
  //     validate: [validator., "Please enter your valid email"],
  //     unique: true,
  //   },

  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [6, "password should have more than 6 characters"],
    select: false,
  },

  // avatar: {
  //     public_id:String,
  //     url:String
  // },

  assignDocs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],

  onHoldDocs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],

  completedDocs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
