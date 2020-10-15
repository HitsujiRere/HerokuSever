'use strict';

const { app } = require('./app');

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

const fallTexts = require('./fallTexts');
app.use('/fallTexts', fallTexts);

app.use(async (req, res, next) => {
    res.status(404);
    res.render('err404.ejs');
});

app.use(async (err, req, res, next) => {
    res.status(500);
    res.render('err500.ejs');
    console.log(err);
});
