const router = require("express").Router();
const {
  getLangs,
  getSubmission,
  createSubmission,
} = require("../controllers/code.controller");
const { protect } = require("../lib/middleware");

router.get("/langs", getLangs);
router.get("/result", getSubmission);
router.use(protect);
router.post("/submit", createSubmission);

module.exports = router;
