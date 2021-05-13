const mongoose = require("mongoose");

const seoSchema = new mongoose.Schema({
  page: {
    type: String,
    required: "Page name giriniz !",
  },
  title: {
    type: String,
    required: "Title giriniz !",
  },
  description: {
    type: String,
    required: "Description giriniz !",
  },
  keywords: {
    type: Array,
    default: [],
  },
});
const Seo = mongoose.model("Seo", seoSchema, "seo");
module.exports = Seo;
