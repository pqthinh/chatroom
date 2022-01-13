const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const DataBase = require("./db.js");
const db = new DataBase();

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>");
});

io.on("connection", (socket) => {

  console.log("A user with ID: " + socket.id + " connected");

  socket.on("disconnect", function () {
    console.log("A user with ID: " + socket.id + " disconnected");
  });

  // More Socket listening here.
  if (io.sockets.connected)
    socket.emit("connections", Object.keys(io.sockets.connected).length);
  else socket.emit("connections", 0);

  socket.on("send-message", async (message) => {
    const data = {
      message: message.message,
      user_id: socket.id,
      name: message.user,
    };
    await db.storeUserMessage(data);
    socket.broadcast.emit("send-message", message);
  });

  socket.on("typing", (data) => {
    console.log("typing")
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    console.log("stop typing")
    socket.broadcast.emit("stopTyping");
  });

  socket.on("joined", async (name) => {
    let messageData = null;
    const data = {
      name,
      user_id: socket.id,
    };
    const user = await db.addUser(data);
    if (user) {
      messageData = await db.fetchUserMessages(data);
    }
    socket.broadcast.emit("joined", messageData);
  });

  socket.on("leave", (data) => {
    socket.broadcast.emit("leave", data);
  });

});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
