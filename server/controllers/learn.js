const { request } = require("express");
const Learn = require("../models/Learn");
const getLearnQuestion = (req, res) => {
  const { learn_id } = req.params;
  if (typeof learn_id !== "undefined") {
    Learn.findById(learn_id)
      .then((learn_question) => {
        if (learn_question) {
          res.status(200).json({ message: learn_question });
        } else {
          res.status(404).json({ message: "Learn question not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: learn_id required" });
  }
};
const getLearnQuestions = (req, res) => {
  Learn.find()
    .then((learn_questions) => {
      if (learn_questions.length) {
        res.status(200).json({ message: learn_questions });
      } else {
        res.status(404).json({ message: "Learn questions not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err });
    });
};
const addLearnQuestion = (req, res) => {
  const { learn_question } = req.body;
  if (
    typeof learn_question.learn_course_key !== "undefined" ||
    typeof learn_question.learn_type !== "undefined" ||
    typeof learn_question.learn_question !== "undefined"
  ) {
    const insertLearnQuestion = new Learn(learn_question);
    insertLearnQuestion
      .save()
      .then((result) => {
        res.status(201).json({ message: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({
      message:
        "Bad request: learn_course_key, learn_type, learn_question and correct_answer required",
    });
  }
};
const updateLearnQuestion = (req, res) => {
  const { question_id, question } = req.body;
  if (
    typeof question_id !== "undefined" ||
    typeof question !== "undefined" ||
    typeof question.learn_course_key !== "undefined" ||
    typeof question.learn_type !== "undefined" ||
    typeof question.learn_question !== "undefined"
  ) {
    Learn.findByIdAndUpdate(question_id, question)
      .then((result) => {
        console.log(result);
        res.status(204).json({ message: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({
      message: "Bad request: question_id and question Object required",
    });
  }
};
const deleteLearnQuestion = (req, res) => {
  const { question_id } = req.body;
  if (typeof question_id !== "undefined") {
    Learn.findByIdAndDelete(question_id)
      .then((result) => {
        console.log(result);
        res.status(204).json({ message: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: question_id required" });
  }
};
const checkLearnQuestion = (req, res) => {
  let { question_id, question_answer } = req.body;
  if (
    typeof question_id !== "undefined" ||
    typeof question_answer !== "undefined"
  ) {
    Learn.findById(question_id)
      .then((question) => {
        question_answer = question_answer.toLowerCase();
        switch (question.learn_type) {
          case "text":
          case "options":
            if (question.correct_answer.toLowerCase() === question_answer) {
              res.status(200).json({ message: "Correct answer" });
            } else {
              res.status(200).json({ message: "Wrong answer" });
            }
            break;
          case "select_picture":
            if (question[Number(question_answer)].isCorrect === true) {
              res.status(200).json({ message: "Correct answer" });
            } else {
              res.status(200).json({ message: "Wrong answer" });
            }
            break;
          default:
            res.status(500).json({ message: "Learn type not found" });
            break;
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Bad request: question_id, question_answer required" });
  }
};
module.exports = {
  getLearnQuestion,
  getLearnQuestions,
  checkLearnQuestion,
  addLearnQuestion,
  updateLearnQuestion,
  deleteLearnQuestion,
};
