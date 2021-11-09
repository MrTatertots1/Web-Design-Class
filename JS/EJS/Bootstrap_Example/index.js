const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const redditData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home', { name: 'Home' });
});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { num, name: 'Random' }); // Pass data using {num} to match variable exactly or {myNum : num} to match num to variable myNum
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit, name: '404 Error' });
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});