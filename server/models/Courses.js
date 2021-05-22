const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const CoursesSchema = new Schema({
  course_key: String,
  course_name: {
    type: String,
    required: true,
  },
});
module.exports = model("Courses", CoursesSchema);
