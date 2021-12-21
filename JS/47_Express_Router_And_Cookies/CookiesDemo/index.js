const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser('thisismysecret'));

app.get('/greet', (req, res) => {
    const { name = 'anonymous' } = req.cookies;
    res.send(`HEY THERE ${name}!`);
});

app.get('/setname', (req, res) => {
    res.cookie('name', 'henrietta'); // creates cookie - a response still must be sent for it to show
    res.send('OK SENT YOU A COOKIE');
});

app.get('/getsignedcookie', (req, res) => {
    res.cookie('fruit', 'grape', { signed: true });
    res.send('OK SIGNED YOUR COOKIE');
});

app.get('/verifyfruit', (req, res) => {
    res.send(req.signedCookies);
});

app.listen(3000, () => {
    console.log('SERVING PORT 3000');
});