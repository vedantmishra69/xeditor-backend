const router = require("express").Router();
const hocusServer = require("../lib/hocus");
const { rooms } = require("../lib/chat");

router.ws("/doc", (websocket, request) => {
  console.log("Connected");
  hocusServer.handleConnection(websocket, request);
});

// router.ws("/chat", (ws, req) => {
//   const roomId = req.headers["sec-websocket-protocol"];
//   if (!rooms.has(roomId)) rooms.set(roomId, []);
//   rooms.get(roomId).push(ws);
// });

module.exports = router;
