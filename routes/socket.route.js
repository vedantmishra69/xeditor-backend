const router = require("express").Router();
const hocusServer = require("../lib/hocus");

router.ws("/doc", (websocket, request) => {
  hocusServer.handleConnection(websocket, request);
});

module.exports = router;
