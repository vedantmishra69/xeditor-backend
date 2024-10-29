const express = require("express");
const router = express.Router();
const collabRoutes = require("./socket.route");
const codeRoutes = require("./code.route");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.use("/collab", collabRoutes);
router.use("/code", codeRoutes);

module.exports = router;
