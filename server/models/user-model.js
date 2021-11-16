// const mongoose = require("mongoose");
import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, minLength: 3, maxLength: 50 },
  email: { type: String, required: true, minLength: 6, maxLength: 100 },
  password: { type: String, required: true, minLength: 6, maxLength: 1024 },
  role: { type: String, enum: ["student", "instructor"] },
  date: { type: Date, default: Date.now },
});

userSchema.methods.isStudent = () => {
  return this.role == "student";
};

userSchema.methods.isInstructor = () => {
  return this.role == "instructor";
};

// mongoose schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.method.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
