'use strict';

const { socketio } = require('./app');

const express = require('express')
const router = express.Router()

socketio.on('connection', (socket) => {
    socket.on('shareTexts_message', (msg) => {
        if (msg !== '') {
            console.log('message: ' + msg);
            socketio.emit('shareTexts_message', msg);
        }
    });
});

router.use('/', async (req, res) => {
    res.render('fallTexts.ejs');
});

setInterval(() => {
    socketio.emit('shareTexts_message', new Date().toLocaleTimeString());
}, 1000);

module.exports = router;
