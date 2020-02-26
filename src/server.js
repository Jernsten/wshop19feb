// Här ska vi definiera vår server! Men vi ska inte starta den
// (alltså app.listen(port, ()=>{}), har vi inte i denna fil, utan i index.js)
const express = require('express')
// const sassMiddleware = require('node-sass-middleware')
const app = express()
const port = process.env.PORT || 8080 // KEMAL // hämtar port från procenv
const productItem = require('../model/product')

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


// SASSKODEN SOM FÖRSVANN Enbart för dev, använd istället webpack "css loader" eller dyl


// define a static folder, 'public'
app.use(express.static('dist/public')) // KEMAL dist/public
// 
app.use(express.urlencoded({ extended: true }));

// define what view engine to use, ejs in this case
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