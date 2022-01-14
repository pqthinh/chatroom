require("dotenv").config();
const app = require("express")();
const express = require("express");
const cors = require("cors");
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});
const DataBase = require("./db.js");
const db = new DataBase();
app.use(
  cors({
    origin: "*",
    "Access-Control-Allow-Origin": "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "64mb" }));
app.use(express.urlencoded({ limit: "64mb", extended: true }));

app.get("/", (req, res) => {
  res.json("Hello world");
});

// register
app.post("/register", async (req, res) => {
  try {
    const { email, password, name, avatar } = req.body;
    const response = await db.addUser({ email, password, name, avatar });
    res.json(response);
  } catch (err) {
    res.json(err).status(400);
  }
});

// login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await db.login({ email, password });
    res.json(response);
  } catch (err) {
    res.json(err).status(400);
  }
});

// send message of room
app.post("/send-message", (req, res) => {
  res.json("Hello world");
});

// get list message of room
app.post("/chat/room", (req, res) => {
  res.json("Hello world");
});

// create room
app.post("/chat/create-room", async (req, res) => {
  try {
    const { uid, name, listUser } = req.body;
    let response = await db.createRoom({ founderId: uid, name });
    console.log(response);
    let { roomId } = response;
    response = await db.addUserToRoom({ roomId, listUser });
    res.json(response);
  } catch (err) {
    res.json(err).status(400);
  }
});

// upload file
app.post("/upload", (req, res) => {
  res.json("Hello world");
});

io.on("connection", (socket) => {
  console.log(
    "A user with ID: " + socket.id + " connected",
    socket.myappsuperuserid
  );

  socket.on("setUserId", function (uid) {
    socket.uid = uid;
    socket.id = uid;
  });

  socket.on("disconnect", function () {
    console.log("A user with ID: " + socket.id + " disconnected");
  });

  // More Socket listening here.
  if (io.sockets.connected) {
    socket.emit("connections", Object.keys(io.sockets.connected).length);
    console.log(io.sockets.connected);
  } else socket.emit("connections", 0);

  socket.on("send-message", async (message) => {
    console.log(`User socket.id send message: ${JSON.stringify(message)}`);
    const data = {
      message: message.message,
      user_id: socket.id,
    };
    // await db.storeUserMessage(data);
    socket.broadcast.emit("send-message", message);
  });

  socket.on("typing", (data) => {
    console.log("typing");
    socket.broadcast.emit("typing", data);
  });

  socket.on("stopTyping", () => {
    console.log("stop typing");
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
