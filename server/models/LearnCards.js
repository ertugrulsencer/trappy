const mongoose = require("mongoose");
const LearnCardsSchema = mongoose.Schema({
  learn_text: {
    type: String,
    required: true,
  },
  learn_options: {
    type: Array,
    default: [
      {
        image: String,
        text: String,
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
      {
        image: String,
        text: String,
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
      {
        image: String,
        text: String,
        isCorrect: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
});
const model = mongoose.model("LearnCards", LearnCardsSchema);
module.exports = model;
