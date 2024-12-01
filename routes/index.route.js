const express = require("express");
const router = express.Router();
const collabRoutes = require("./socket.route");
const codeRoutes = require("./code.route");

router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});
router.use("/collab", collabRoutes);
router.use("/code", codeRoutes);

module.exports = router;
