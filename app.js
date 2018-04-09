const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.listen(3000);

app.set('view engine', 'pug');

app.use(parser.urlencoded({extended: false}));
app.use(cookieParser());

const mainRoutes = require('./routes/index');
const cardRoutes = require('./routes/cards')

app.use(mainRoutes);
app.use('/cards', cardRoutes);



app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);

});



app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});
