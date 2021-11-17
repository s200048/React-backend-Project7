const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  id: { type: String },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    // ref 係講會同User connection connect
    ref: "User",
  },
  students: {
    type: [String],
    // default 係empty 因為重未有學生registy
    default: [],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
