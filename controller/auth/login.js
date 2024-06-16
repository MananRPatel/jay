require("dotenv").config;
const jwt = require('jsonwebtoken');
const Auth = require("./auth");

const login = async (req, res) => {

    const { email, password } = req.body;


    if (!(user = await Auth.isUserExist(email))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!(user.password === password && user.email === email)) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    res.json({ message: 'Login successful', token });

}

module.exports = login; 