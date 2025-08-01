const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ message: "토큰이 없습니다." });

  jwt.verify(token, "mysecretkey", (err, user) => {
    if (err) return res.status(403).json({ message: "토큰이 유효하지 않습니다." });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
