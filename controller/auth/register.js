require("dotenv").config;
const jwt = require("jsonwebtoken");
const Auth = require("./auth");
let userModel = require("../../model/userModel");

const register = async (req, res) => {
  const { name, email, password, authToken } = req.body;

  // Validate the input
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  if ((user = await Auth.isUserExist(email))) {
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
    name,
    email,
    password,
    role
  };

  const id = await userModel.addUser(newUser);

  // Generate JWT token
  const token = jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  res.status(201).json({ message: "User registered successfully", token });
};

module.exports = register;
