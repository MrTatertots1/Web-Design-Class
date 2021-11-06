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