const router = require("express").Router();
const {
  getSeo,
  addSeo,
  updateSeo,
  deleteSeo,
} = require("../controllers/seoController");

router.get("/seo/:page", getSeo);
router.get("/seo", getSeo);
router.post("/seo", addSeo);
router.put("/seo/:id", updateSeo);
router.delete("/seo/:id", deleteSeo);

// 404
router.get("*", (req, res) => {
  res.status(404).send("<h1>Sayfa Bulunamadı !</h1>");
});
module.exports = router;
