'use strict';

const { socketio } = require('./app');

const express = require('express')
const router = express.Router()

router.use('/', async (req, res) => {
    res.render('bubbleTexts.ejs');
});

module.exports = router;
