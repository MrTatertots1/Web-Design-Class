const express = require('express');
const app = express();

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') next();
    res.send('SORRY YOU NEED A PASSWORD')
}

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS!!")
    next()
})

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});
app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
});
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to people')
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
});