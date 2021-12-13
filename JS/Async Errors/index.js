const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const AppError = require('./AppError')

const Product = require('./models/product')

mongoose.connect('mongodb://localhost:27017/farmStand2')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

const categories = ['fruit', 'vegetable', 'dairy'];
const port = 3000

function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

app.get('/products', wrapAsync(async (req, res, next) => {
    let { category } = req.query
    if (category) {
        const products = await Product.find({ category })
        category = category.substr(0, 1).toUpperCase() + category.substr(1)
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
}))

app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})


app.get('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) throw next(new AppError('Product Not Found', 404))
    res.render('products/show', { product })
}))

app.post('/products', wrapAsync(async (req, res, next) => {
    const newProduct = new Product(req.body)
    await newProduct.save()
    res.redirect(`products/${newProduct._id}`)
    // res.redirect()
}))

app.get('/products/:id/edit', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findById(id)
    if (!product) throw next(new AppError('Product Not Found', 404))
    res.render('products/edit', { product, categories })
}))

app.put('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
}))

app.delete('/products/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params
    const deletedProduct = await Product.findByIdAndDelete(id)
    res.redirect('/products')
}))


app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err
    res.status(status).send(`${status}: ${message}`)
})


app.listen(port, () => {
    console.log(`APP >> listening on port: ${port}`)
})