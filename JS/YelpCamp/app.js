// App Initializations
const express = require('express');
const port = 3000;
const path = require('path');

// Require Models
const Campground = require('./models/campground');

// Mongo Initializations
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// End Initializations

// Handling requests
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My Backyard', description: 'Cheap Camping' });
    await camp.save();
    res.send(camp);
});

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
});