const express = require('express');
const {GenerateNewUrl,GetAna} = require('../controller/controls');
const router = express.Router();

router.post('/',GenerateNewUrl);
router.get('/ana/:shortId',GetAna);

module.exports = router;