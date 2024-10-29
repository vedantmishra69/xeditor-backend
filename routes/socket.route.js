const router = require("express").Router();
const hocusServer = require("../lib/hocus");

router.ws("/", (websocket, request) => {
  const context = {
    user: {
      id: 1234,
      name: "Jane",
    },
  };

  hocusServer.handleConnection(websocket, request, context);
});

module.exports = router;
