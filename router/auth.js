const express = require('express');
const router = express.Router();
const sign = require('../controller/auth/sign');
const login = require('../controller/auth/login');

router.post('/sign/',sign);
router.get('/login',login);

module.exports = router;
