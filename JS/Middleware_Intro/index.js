const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log('This is my first middleware');
    next();
});

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});
app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});