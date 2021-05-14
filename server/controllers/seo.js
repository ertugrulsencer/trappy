const Seo = require("../models/Seo");
module.exports = {
  // Get Seo
  getSeo: (req, res) => {
    if (req.params.page) {
      Seo.find({ page: req.params.page })
        .then((result) => {
          if (result.length) {
            res.status(200).send(result);
          } else {
            res.status(404).send("Seo bulunamadı !");
          }
        })
        .catch((error) => res.status(500).send(error));
    } else {
      Seo.find()
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((error) => res.status(500).send(error));
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
      .catch((err) => res.status(400).send("Seo eklenemedi !"));
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
        res.send(err || result);
      }
    );
  },
  // Delete Seo
  deleteSeo: (req, res) => {
    Seo.deleteMany({ _id: req.params.id }, {}, (err, result) => {
      res.send(err || result);
    });
  },
};
