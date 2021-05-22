const mongoose = require("mongoose");
const LearnSchema = mongoose.Schema({
  learn_course_key: String,
  learn_type: {
    type: String,
    required: true,
  },
  learn_question: {
    type: String,
    required: true,
  },
  learn_answers: {
    type: Array,
    required: false,
  },
  learn_options: {
    type: Array,
    required: false,
  },
  correct_answer: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model("Learn", LearnSchema);
