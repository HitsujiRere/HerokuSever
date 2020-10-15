'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(express.static('public'));

const server = app.listen(PORT, async (req, res) => {
    console.log('Server is up!');
});

const socketio = require("socket.io").listen(server);

exports.app = app;
exports.socketio = socketio;
