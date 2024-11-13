exports.rooms = new Map();

exports.broadcast = (roomId, ws, message) => {
  const clients = rooms.get(roomId);
  for (const client in clients) {
    if (client && client !== ws && client.readyState === 1)
      client.send(message);
  }
};
