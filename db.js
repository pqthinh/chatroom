const mysql = require("mysql2");
let db = null;
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

  addUser(data) {
    return new Promise(async (resolve, reject) => {
      if (await this.isUserExist(data)) {
        resolve(true);
      } else
        db.execute(
          "INSERT INTO users (name, password, email, avatar) VALUES (?,?, ?, ?)",
          [data.name, data.password, data.email, data.avatar],
          function (err, rows) {
            if (err) reject(new Error(err));
            else resolve(rows);
          }
        );
    });
  }

  isUserExist(data) {
    return new Promise((resolve, reject) => {
      db.execute(
        "SELECT * FROM users WHERE email = ?",
        [data.email],
        function (err, rows) {
          if (err) reject(new Error(err));
          else resolve(rows[0]);
        }
      );
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
