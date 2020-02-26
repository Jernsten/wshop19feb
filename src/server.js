// Här ska vi definiera vår server! Men vi ska inte starta den
// (alltså app.listen(port, ()=>{}), har vi inte i denna fil, utan i index.js)
const express = require('express')
const productItem = require('../model/product')
const sassMiddleware = require('node-sass-middleware')
const app = express()
const isDevMode = process.env.NODE_ENV == 'development'
const port = process.env.PORT || 8080

const ROUTE = {
    root: '/',
    product: '/product',
    gallery: '/gallery',
    addProduct: '/add-product'
}

const VIEW = {
    gallery: 'gallery',
    product: 'product',
    main: 'main',
    addProduct: 'add-product'
}

// sass middleware only used in development mode
if (isDevMode) {
    app.use(sassMiddleware({
        src: 'sass',
        dest: 'public',
        // debug: true, // för att skriva ut data till konsollen
        outputStyle: 'compressed'
    }))
}

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')




// ------------------  Routs  -------------------//
app.get(ROUTE.gallery, async (req, res) => {
    const productList = await productItem.find()
    res.status(200).render(VIEW.gallery, { productList })
})

app.get(ROUTE.product, (req, res) => {
    res.status(200).render(VIEW.product, {})
})

app.post(ROUTE.addProduct, (req, res) => {
    // spara ny produkt
    new productItem({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imgUrl: req.body.imgUrl
    }).save() // och spara till databasen

    res.status(200).redirect(ROUTE.gallery)
})

app.get(ROUTE.root, (req, res) => {
    res.status(200).render(VIEW.main, {})
})

app.get(ROUTE.addProduct, (req, res) => {
    res.status(200).render(VIEW.addProduct, {})
})

module.exports = { app, port, express }