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

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.use(async (req, res, next) => {
    res.status(404);
    res.render('err404.ejs');
});

app.use(async (err, req, res, next) => {
    res.status(500);
    res.render('err500.ejs');
    console.log(err);
});

app.listen(PORT, async (req, res) => {
    console.log('Server is up!');
});
