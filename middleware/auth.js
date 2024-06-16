require("dotenv").config;
const jwt = require("jsonwebtoken");

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token found

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid or expired token
    req.token = user; // Save the decoded user information to the request object
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateToken