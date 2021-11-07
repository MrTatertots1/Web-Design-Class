const express = require('express');
const app = express();
const port = 3000;

// Sets a constant path for the views directory
// App can now be ran from any directory in the system with no errors
const path = require('path');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('cats', { cats });
});

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    const color = 'Pink';
    res.render('random', { num, myColor: color }); // Pass data to random.ejs. You can specify variable name for random.ejs or just use the same variable name
});

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.render('subreddit', { subreddit });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});