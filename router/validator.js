const express = require('express');
const router = express.Router();
const user = require('../controller/validator/user');

router.get('/user',user);

module.exports = router;
