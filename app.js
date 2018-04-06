const express = require('express');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.listen(3000);

app.set('view engine', 'pug');
app.use(parser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/',(req, res) => {
    const name = req.cookies.username;
    if(name){
        res.render('index', {name: name});
    }
    else{
        res.render('index');
    }

});

app.post('/',(req, res) =>{
    const name = req.cookies.username;
    if (name) {
        res.clearCookie('username');
        res.render('index');
    }
    else{
        res.redirect('/hello')
    }
});

app.get('/cards', (req, res) => {
    res.render('card', {prompt: "Who is buried in Grant's tomb?", hint: "Think about who's tomb it is."});
});


app.get('/hello', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.redirect('/');
    }
    else {
        res.render('hello');
    }
});

app.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});