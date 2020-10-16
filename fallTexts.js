'use strict';

const { socketio } = require('./app');

const express = require('express')
const router = express.Router()

socketio.on('connection', (socket) => {
    socket.on('fallTexts_message', (msg) => {
        console.log('message: ' + msg);
        socketio.emit('fallTexts_message', msg);
    });
});

router.use('/', async (req, res) => {
    res.render('fallTexts.ejs');
});

setInterval(() => {
    socketio.emit('fallTexts_message', new Date().toLocaleTimeString());
}, 1000);

module.exports = router;
