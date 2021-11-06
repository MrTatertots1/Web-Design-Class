const express = require('express')
const app = express()
const port = 3000

// app.use((req, res) => {
//     console.log('NEW REQUEST!!')
//     // res.send('HELLO') //Sends Text
//     // res.send({color:'red'}) // Sends JSON
//     // res.send('<h1>Hello There</h1>') // Sends HTML
// })

// / => 'home'
app.get('/', (req, res) => {
    res.send('This is the Home Page')
})

app.get('/r/:subreddit', (req, res) => { // Defines a pattern. Can continue ex. "/r/:subreddit/:comments"
    const { subreddit } = req.params
    res.send(`<h1>Welcome to the ${subreddit} Subreddit</h1>`)
})

app.get('/search', (req, res) => {
    const { q } = req.query
    res.send(`<h1>Search results for: ${q}</h1>`)
})

// /cats => 'meow'
app.get('/cats', (req, res) => {
    res.send('MEOW')
})

app.post('/cats', (req, res) => {
    res.send('POST REQUEST SENT TO /CATS')
})

// /dogs => 'woof'
app.get('/dogs', (req, res) => {
    res.send('WOOF')
})

app.get('*', (req, res) => { // Catch all, MUST COME LAST
    res.send("I dont know that path")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})