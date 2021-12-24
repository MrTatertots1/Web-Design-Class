// App Initializations
const express = require('express');
const port = 3000;
const path = require('path');
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')

const methodOverride = require('method-override');

// Require Routes
const campgroundsRouter = require('./routes/campgrounds')
const reviewsRouter = require('./routes/reviews')

// Mongo Initializations
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())
// End Initializations

app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

// Handling requests
app.get('/', (req, res) => {
    res.render('home');
})

app.use('/campgrounds', campgroundsRouter)
app.use('/campgrounds/:id/reviews', reviewsRouter)

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    if (!err.message) err.message = 'Oh no! Something went wrong'
    if (!err.status) err.status = 404
    res.status(err.status).render('error', { err })
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
})