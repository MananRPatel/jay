require("dotenv").config;
const jwt = require('jsonwebtoken');
const Auth = require("./auth");

const login = async (req,res)=>{
    
    const { username, password } = req.body;


    if (!(user=Auth.isUserExist(username))) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    if (!(user.password === password && user.username === username)) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: 'Login successful', token });

}

module.exports = login; 