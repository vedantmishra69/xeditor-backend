const express = require("express");
const router = express.Router();
const collabRoutes = require("./socket");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/collab", collabRoutes);

module.exports = router;
