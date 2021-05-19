const router = require("express").Router();
const { getSeo, addSeo, updateSeo, deleteSeo } = require("../controllers/seo");
const {
  getUsers,
  addUser,
  updateUser,
  searchUser,
} = require("../controllers/user");

/* Seo */
router.get("/seo/:page", getSeo);
router.get("/seo", getSeo);
router.post("/seo", addSeo);
router.put("/seo/:id", updateSeo);
router.delete("/seo/:id", deleteSeo);
/* User */
router.get("/users", getUsers);
router.post("/new-user", addUser);
router.put("/update-user", updateUser);
router.get("/search-user", searchUser);

// 404
router.get("*", (req, res) => {
  res.status(404).send("<h1>Sayfa Bulunamadı !</h1>");
});
module.exports = router;
