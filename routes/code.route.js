const router = require("express").Router();
const {
  getLangs,
  getSubmission,
  createSubmission,
} = require("../controllers/code.controller");

router.get("/langs", getLangs);
router.get("/result", getSubmission);
router.post("/submit", createSubmission);

module.exports = router;
