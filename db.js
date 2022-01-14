const mysql = require("mysql2");
const utils = require("./services/jwt");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let db = null;
const defaultAvatar =
  " http://image.vtc.vn/files/f1/2013/06/07/ngoc-trinh_1jpg.jpg ";
class DB {
  constructor() {
    db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "simple-chat-app",
    });
    db.connect(function (err) {
      if (err) console.log(err);
    });
  }

  addUser({ email, password, avatar = defaultAvatar, name }) {
    return new Promise(async (resolve, reject) => {
      if (await this.isUserExist({ email })) {
        resolve("Email da duoc su dung");
      } else {
        const hash = bcrypt.hashSync(password, saltRounds);
        db.execute(
          "INSERT INTO users (name, password, email, avatar ) VALUES (?,?, ?, ?)",
          [name, hash, email, avatar],
          function (err, rows) {
            if (err) reject(new Error(err));
            else resolve(`User ${rows.insertId} created`);
          }
        );
      }
    });
  }

  login({ email, password }) {
    return new Promise(async (resolve, reject) => {
      const user = await this.isUserExist({ email });
      if (user) {
        const uPassword = user.password;
        if (!bcrypt.compareSync(password, uPassword)) {
          reject(new Error("Password is Wrong."));
        }
        const token = utils.generateToken(user);
        const userObj = utils.getCleanUser(user);
        resolve({ data: { user: userObj, token }, message: "Login success" });
      } else reject(new Error("Email khong ton tai"));
    });
  }

  isUserExist(data) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT * FROM users WHERE email = ?",
        [data.email],
        function (err, rows) {
          if (err) reject(false);
          else resolve(rows[0]);
        }
      );
    });
  }

  createRoom({ founderId, nameRoom = "" }) {
    return new Promise((resolve, reject) => {
      const roomId = Date.now();
      db.execute(
        "insert into room ( roomId, idUser , name) values (? ,? , ?)",
        [roomId, founderId, nameRoom],
        function (err, rows) {
          if (err) reject(false);
          else resolve({ id: rows.insertId, roomId: roomId });
        }
      );
    });
  }

  addUserToRoom({ roomId, listUser }) {
    return new Promise((resolve, reject) => {
      if (Array.isArray(listUser)) {
        listUser.map((u) => {
          db.execute(
            "insert into room (roomId, idUser) values (?, ?)",
            [roomId, u],
            function (err, _) {
              if (err) reject(err);
            }
          );
        });
      } else {
        db.execute(
          "insert into room (roomId, idUser) values (?, ?)",
          [roomId, listUser],
          function (err, _) {
            if (err) reject(err);
          }
        );
      }
      resolve(`Add ${JSON.stringify(listUser)} into room ${roomId}`);
    });
  }

  fetchUserMessages(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * from messages where roomId =?",
        [data.roomId],
        function (err, rows) {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }

  storeUserMessage(data) {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO messages (message, userId, files, roomId) VALUES (?,?,?,?)",
        [data.message, data.userId, data.file, data.roomId],
        function (err, rows) {
          if (err) reject(new Error(err));
          else resolve(rows);
        }
      );
    });
  }
}

module.exports = DB;
