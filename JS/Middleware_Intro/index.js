const express = require('express');
const app = express();
const AppError = require('./AppError')

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') next();
    throw new AppError('Password required!', 401)
}

// app.use('/dogs', (req, res, next) => {
//     console.log("I LOVE DOGS!!")
//     next()
// })

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});
app.get('/error', (req, res) => {
    chicken.fly()
})
app.get('/dogs', (req, res) => {
    res.send('WOOF WOOF');
});
app.get('/secret', verifyPassword, (req, res) => {
    res.send('MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to people')
})
app.get('/admin', (req, res) => {
    throw new AppError('You are not an admin', 403)
})



app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err
    res.status(status).send(`${status}: ${message}`)
})


app.listen(3000, () => {
    console.log('Listening on port 3000');
});