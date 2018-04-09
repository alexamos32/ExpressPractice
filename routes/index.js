const express = require('express');
const router = express.Router();




router.get('/',(req, res) => {
    const name = req.cookies.username;
    if(name){
        res.render('index', {name: name});
    }
    else{
        res.render('index');
    }

});

router.post('/',(req, res) =>{
    const name = req.cookies.username;
    if (name) {
        res.clearCookie('username');
        res.render('index');
    }
    else{
        res.redirect('/hello')
    }
});


router.get('/hello', (req, res) => {
    const name = req.cookies.name;
    if (name) {
        res.redirect('/');
    }
    else {
        res.render('hello');
    }
});

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username);
    res.redirect('/');
});

module.exports = router;
