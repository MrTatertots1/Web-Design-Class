const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const axios = require('axios');

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const url = 'https://api.unsplash.com/collections/429524/photos?client_id=2eEW2PZQpGVVSVAMd4sA4lHQ3tqHdsEia1RAdgo6x4M&page=1&per_page=50';

const seedDB = async () => {
    const allPhotos = await axios.get(url)
        .then(function (res) {
            return res.data;
        });
    await Campground.deleteMany({});

    for (let i = 0; i < 30; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '61d4f82f09328c55a3c551e3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, quos eligendi et corrupti dignissimos deserunt voluptate modi. Dolorum, animi fuga tenetur, ea corrupti, repudiandae totam aut pariatur eius libero earum.',
            price,
            images: { url: allPhotos[i].urls.regular, filename: 'SEEDED IMAGE' }
        });
        await camp.save();
    }
};
seedDB().then(() => {
    db.close();
});
