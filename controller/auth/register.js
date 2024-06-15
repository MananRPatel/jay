require("dotenv").config;
const jwt = require("jsonwebtoken");
const Auth = require("./auth");
let userModel = require("../../model/user");

const register = async (req, res) => {
  const { name, username, password, authToken } = req.body;

  // Validate the input
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ message: "Name, Username and password are required" });
  }

  if ((user = Auth.isUserExist(username))) {
    {
      return res.status(302).json({
        message: "User already exists, redirect to login",
        redirect: "/login",
      });
    }
  }

  let role = "user";

  try {
    const decoded = jwt.verify(authToken, "your_jwt_secret");
    role = decoded.role;
  } catch (e) {}

  const newUser = {
    id: Math.floor(Math.random() * 10000) + 1,
    username,
    name,
    role,
    password,
  };

  userModel.addUser(newUser);

  // Generate JWT token
  const token = jwt.sign(
    { id: newUser.id, role: newUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(201).json({ message: "User registered successfully", token });
};

module.exports = register;
