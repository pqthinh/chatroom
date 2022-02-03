var jwt = require("jsonwebtoken");

function generateToken(user) {
  if (!user) return null;

  var u = {
    id: user.id,
    uid: user.uid,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };

  return jwt.sign(u, process.env.JWT_SECRET || "thinhpq", {
    expiresIn: 60 * 60 * 24 * 30*2, // expires in 2 months
  });
}

function getCleanUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    uid: user.uid,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
  };
}

function decodeToken() {
  return jwt.verify(token, process.env.JWT_SECRET || "thinhpq");
}

module.exports = {
  generateToken,
  getCleanUser,
  decodeToken,
};
