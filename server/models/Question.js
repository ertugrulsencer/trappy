const mongoose = require("mongoose");
const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
});
const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
