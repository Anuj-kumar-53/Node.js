const express = require('express');
const {Sign_in,login} = require('../controller/user');
const router = express.Router();

router.post('/',Sign_in);
router.post('/login',login);
module.exports = router;