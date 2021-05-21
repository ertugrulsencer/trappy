const LearnCards = require("../models/LearnCards");
/* Get Learn Cards */
const getLearnCards = (req, res) => {
  LearnCards.find()
    .then((card) => {
      if (card.length) {
        res.status(200).json({ message: card });
      } else {
        res.status(404).json({ message: "Cannot Learn Cards" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err });
    });
};
/* Add Learn Card */
const addLearnCard = (req, res) => {
  const { card } = req.body;
  const { learn_options } = req.body.card;
  learn_options.forEach((option) => {
    if (
      typeof option.image === "undefined" ||
      typeof option.text === "undefined" ||
      typeof option.isCorrect === "undefined"
    ) {
      res
        .status(400)
        .json({ message: "Bad request: image, text and isCorrect required" });
      return;
    }
  });
  if (card) {
    const inserCard = new LearnCards(card);
    inserCard
      .save()
      .then((result) => {
        res.status(201).json({ message: `Learn Card added: ${result}` });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: card Object required" });
  }
};
module.exports = {
  getLearnCards,
  addLearnCard,
};
