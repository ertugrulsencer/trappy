const Seo = require("../models/Seo");
module.exports = {
  // Get Seo
  getSeo: (req, res) => {
    if (req.params.page) {
      Seo.find({ page: req.params.page })
        .then((result) => {
          if (result.length) {
            res.status(200).json({ message: result });
          } else {
            res.status(404).json({ message: "Seo not found" });
          }
        })
        .catch((error) => res.status(500).json({ message: error }));
    } else {
      Seo.find()
        .then((result) => {
          res.status(200).json({ message: result });
        })
        .catch((error) => res.status(500).json({ message: error }));
    }
  },
  // Add Seo
  addSeo: (req, res) => {
    const insertSeo = new Seo(req.body);
    insertSeo
      .save()
      .then(() => {
        res.status(201).json({ message: "Seo başarı ile eklendi" });
      })
      .catch((err) => res.status(400).json({ message: "Seo added" }));
  },
  // Update Seo
  updateSeo: (req, res) => {
    const data = {
      page: req.body.page,
      title: req.body.title,
      description: req.body.description,
      keywords: req.body.keywords,
    };
    Seo.updateMany(
      { _id: req.params.id },
      data,
      { new: true, upsert: true },
      (err, result) => {
        if (err) {
          res.json({ message: err });
        } else {
          res.json({ message: result });
        }
      }
    );
  },
  // Delete Seo
  deleteSeo: (req, res) => {
    Seo.deleteMany({ _id: req.params.id }, {}, (err, result) => {
      if (err) {
        res.json({ message: err });
      } else {
        res.json({ message: result });
      }
    });
  },
};
