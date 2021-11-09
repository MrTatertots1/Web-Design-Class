const express = require('express')
const app = express()
const port = 8080

app.use((req, res) => {
    console.log('WE GOT A NEW REQUEST')
    // res.send('HELLO WORLD')
    res.send({ color: 'red' })
})

app.listen(port, () => {
    console.log(`LISTENING ON PORT ${port}`)
})