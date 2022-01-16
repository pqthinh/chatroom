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

// get list user
app.get("/users", async (req, res) => {
  try {
    const response = await db.getListUser();
    res.json(response);
  } catch (err) {
    res.json(err).status(400);
  }
});

// get list message dependent roomId
app.get("/room/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    console.log(roomId);
    const response = await db.getMessageOfRoom(roomId);
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
app.get("/list-room/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const response = await db.getListRoom(uid);
    res.json(response);
  } catch (err) {
    res.json(err).status(400);
  }
});

// create room
app.post("/chat/create-room", async (req, res) => {
  try {
    const { uid, name, listUser } = req.body;
    let response = await db.createRoom({ founderId: uid, name });
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
  console.log("A user with ID: " + socket.id + " connected");

  socket.on("setRoomId", function (roomId) {
    socket.roomId = roomId;
    socket.join(roomId);
  });

  socket.on("disconnect", function () {
    console.log("A user with ID: " + socket.id + " disconnected");
  });

  // More Socket listening here.
  if (io.sockets.connected)
    socket.emit("connections", Object.keys(io.sockets.connected).length);
  else socket.emit("connections", 0);

  socket.on("send-message", async ({ message, user_id, file, roomId=socket.roomId }) => {
    
    console.log(
      `User ${socket.id} send message: ${JSON.stringify({
        message,
        user_id,
        roomId
      })}`
    );
    if(!roomId) console.log("Room id null")
    const data = {
      message: message,
      userId: user_id,
      roomId: roomId,
      file: file
    };
    await db.storeUserMessage(data);
    socket
      .to(socket.roomId)
      .emit("send-message", {
        message,
        user_id,
        file,
        roomId,
        stamp: new Date(),
      });
  });

  socket.on("typing", (data) => {
    console.log("typing");
    socket.to(socket.roomId).emit("typing", data);
  });

  socket.on("stopTyping", () => {
    console.log("stop typing");
    socket.to(socket.roomId).emit("stopTyping");
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
    socket.to(socket.roomId).emit("joined", messageData);
  });

  socket.on("leave", (data) => {
    socket.to(socket.roomId).emit("leave", data);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
