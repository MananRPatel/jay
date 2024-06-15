require("dotenv").config;
const jwt = require("jsonwebtoken");
const Auth = require("./auth");
let userModel = require("../../model/user");

const register = async (req, res) => {
  const { name, username, password } = req.body;


  // Validate the input
  if (!name || !username || !password) {
    return res
      .status(400)
      .json({ message: "Name, Username and password are required" });
  }

  if (Auth.isUserExist(username)) {
    {
      return res.status(302).json({
        message: "User already exists, redirect to login",
        redirect: "/login",
      });
    }
  }

  const newUser = {
    id: Math.floor(Math.random() * 10000) + 1,
    username,
    name,
    role: "user",
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
