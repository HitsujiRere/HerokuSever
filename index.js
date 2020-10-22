'use strict';

const { app } = require('./app');

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/fallTexts', async (req, res) => {
    res.write('<script>window.location.href = "/shareTexts/fall";</script>');
});

const shareTexts = require('./shareTexts');
app.use('/shareTexts', shareTexts);

app.use(async (req, res, next) => {
    res.status(404);
    res.render('err404.ejs');
});

app.use(async (err, req, res, next) => {
    res.status(500);
    res.render('err500.ejs');
    console.log(err);
});
