'use strict';

const { app } = require('./app');

app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/fallTexts', async (req, res) => {
    res.write('<script>window.location.href = "/shareTexts/fall";</script>');
});

const fallTexts = require('./fallTexts');
app.use('/shareTexts/fall', fallTexts);

const bubbleTexts = require('./bubbleTexts');
app.use('/shareTexts/bubble', bubbleTexts);

app.use(async (req, res, next) => {
    res.status(404);
    res.render('err404.ejs');
});

app.use(async (err, req, res, next) => {
    res.status(500);
    res.render('err500.ejs');
    console.log(err);
});
