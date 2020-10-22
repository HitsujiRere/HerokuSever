'use strict';

const express = require('express')
const router = express.Router()

router.use('/', async (req, res) => {
    res.render('mathjs.ejs')
});

module.exports = router;
