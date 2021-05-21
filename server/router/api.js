const router = require("express").Router();
const {
  getQuestions,
  addQuestion,
  updateQuestion,
  deleteQuestion,
  checkAnswer,
} = require("../controllers/questions");
const { getSeo, addSeo, updateSeo, deleteSeo } = require("../controllers/seo");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  searchUser,
  authUser,
} = require("../controllers/user");

/* Seo */
router.get("/seo/:page", getSeo);
router.get("/seo", getSeo);
router.post("/seo", addSeo);
router.put("/seo/:id", updateSeo);
router.delete("/seo/:id", deleteSeo);
/* User */
router.get("/users", getUsers);
router.get("/user/:user_name", getUser);
router.post("/new-user", addUser);
router.put("/update-user", updateUser);
router.get("/search-user", searchUser);
router.post("/auth-user", authUser);
/* Question Routes */
router.get("/questions", getQuestions);
router.post("/add-question", addQuestion);
router.delete("/delete-question", deleteQuestion);
router.put("/update-question", updateQuestion);
router.post("/check-answer", checkAnswer);

// Not get
router.get("*", (req, res) => {
  res.status(404).send('<span style="color: #c81205">Can not GET !</span>');
});
router.post("*", (req, res) => {
  res.status(404).send('<span style="color: #c81205">Can not POST !</span>');
});
router.put("*", (req, res) => {
  res.status(404).send('<span style="color: #c81205">Can not PUT !</span>');
});
router.delete("*", (req, res) => {
  res.status(404).send('<span style="color: #c81205">Can not DELETE !</span>');
});
module.exports = router;
