const router = require("express").Router();
const { getLangs } = require("../controllers/code.controller");

router.get("/langs", getLangs);

module.exports = router;
