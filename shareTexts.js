'use strict';

const { socketio } = require('./app');

const express = require('express')
const router = express.Router()

const data = new Array();

socketio.on('connection', (socket) => {
    socket.on('shareTexts_message', (msg) => {
        if (msg !== '') {
            console.log('message: ' + msg);

            socketio.emit('shareTexts_message', msg);

            data.push(msg);
            if (data.length > 100) {
                data.splice(100);
            }
        }
    });
});

setInterval(async () => {
    socketio.emit('shareTexts_message', new Date().toLocaleTimeString());
}, 1000);

router.get('/fall', async (req, res) => {
    res.render('fallTexts.ejs');
});

router.get('/bubble', async (req, res) => {
    res.render('bubbleTexts.ejs');
});

router.get('/getTexts', async (req, res) => {
    res.write(JSON.stringify(data));
    res.end();
});

module.exports = router;
