const Question = require("../models/Question");
/* Get Question */
const getQuestions = (req, res) => {
  Question.find()
    .then((questions) => {
      if (questions.length) {
        res.status(200).json({ result: questions });
      } else {
        res.status(404).json({ result: "Questions not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ result: err });
    });
};
/* Add Question */
const addQuestion = (req, res) => {
  if (req.body.question) {
    const newQuestion = req.body.question;
    const insertQuestion = new Question(newQuestion);
    insertQuestion
      .save()
      .then((result) => {
        res.json(201).json({ message: result });
      })
      .catch((err) => {
        res.json(500).json({ message: err });
      });
  } else {
    res.status(500).json({ message: "Question required !" });
  }
};
/* Update Question */
const updateQuestion = (req, res) => {
  if (req.body.update_data && req.body.question_id) {
    const update_data = req.body.update_data;
    Question.findByIdAndUpdate(req.body.question_id, update_data)
      .then((response) => {
        res.status(204).json({ result: response });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ result: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Bad request: Update data and question id required" });
  }
};
const deleteQuestion = (req, res) => {
  const question_id = req.body.question_id;
  if (req.body.question_id) {
    Question.findByIdAndDelete(question_id)
      .then((response) => {
        res.status(204).json({ result: response });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ result: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: Question id required" });
  }
};
/* Exports */
module.exports = {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
};
